"""CPU-only Modal backend for the public portfolio assistant.

Deploy with:
    modal deploy modal_cpu_chat.py

The function URL printed by Modal is intentionally protected by proxy
authentication. Store it in Vercel as MODAL_CPU_CHAT_URL, together with the
existing MODAL_PROXY_TOKEN. Do not expose that token to the browser.
"""

import json
import re
from threading import Thread

import modal
from pydantic import BaseModel, Field


APP_NAME = "zhihong-portfolio-cpu-chat"
MODEL_ID = "Qwen/Qwen3.5-0.8B"
MODEL_CACHE_PATH = "/model-cache"
CPU_CORES = 4.0
MEMORY_MIB = 8_192

app = modal.App(APP_NAME)
model_cache = modal.Volume.from_name("zhihong-portfolio-model-cache", create_if_missing=True)
image = (
    modal.Image.debian_slim(python_version="3.11")
    # The standard PyPI build includes large CUDA libraries. This explicit
    # wheel keeps the image and startup path CPU-only.
    .uv_pip_install(
        "torch==2.6.0+cpu",
        index_url="https://download.pytorch.org/whl/cpu",
    )
    .uv_pip_install(
        "fastapi[standard]",
        "huggingface_hub>=0.34",
        "safetensors>=0.5",
        "transformers>=4.57",
    )
    .env({"HF_HOME": MODEL_CACHE_PATH, "HF_HUB_CACHE": MODEL_CACHE_PATH})
)


class ChatMessage(BaseModel):
    role: str
    # The Next.js route bounds visitor messages at 700 characters, but it also
    # adds a longer curated system profile to every request.
    content: str = Field(min_length=1, max_length=4_000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=7)
    max_tokens: int = Field(default=220, ge=1, le=280)
    stream: bool = False


@app.cls(
    image=image,
    cpu=CPU_CORES,
    memory=MEMORY_MIB,
    timeout=180,
    scaledown_window=300,
    volumes={MODEL_CACHE_PATH: model_cache},
)
@modal.concurrent(max_inputs=1)
class PortfolioCpuChat:
    """One CPU container keeps the model in memory for five idle minutes."""

    @modal.enter()
    def load_model(self) -> None:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        torch.set_num_threads(int(CPU_CORES))
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, cache_dir=MODEL_CACHE_PATH)
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            cache_dir=MODEL_CACHE_PATH,
            dtype=torch.float32,
        )
        self.model.to("cpu")
        self.model.eval()

        # The first startup downloads weights. Persist them so later containers
        # mount the cached files rather than fetching the model again.
        model_cache.commit()

    @modal.fastapi_endpoint(
        method="POST",
        label="zhihong-portfolio-cpu-chat",
        requires_proxy_auth=True,
    )
    def chat(self, request: ChatRequest):
        from fastapi.responses import StreamingResponse
        import torch
        from transformers import TextIteratorStreamer

        messages = [{"role": message.role, "content": message.content} for message in request.messages]
        prompt = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        encoded = self.tokenizer(prompt, return_tensors="pt")

        generation_options = {
            **encoded,
            "do_sample": False,
            "max_new_tokens": request.max_tokens,
            "pad_token_id": self.tokenizer.eos_token_id,
        }

        if request.stream:
            def stream_reply():
                streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, skip_special_tokens=True)
                generation_thread = Thread(target=self.model.generate, kwargs={**generation_options, "streamer": streamer})
                generation_thread.start()

                for chunk in streamer:
                    yield f"data: {json.dumps({'delta': chunk})}\n\n"

                generation_thread.join()
                yield "data: [DONE]\n\n"

            return StreamingResponse(
                stream_reply(),
                media_type="text/event-stream",
                headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
            )

        with torch.inference_mode():
            generated = self.model.generate(**generation_options)

        reply_tokens = generated[0][encoded.input_ids.shape[1] :]
        reply = self.tokenizer.decode(reply_tokens, skip_special_tokens=True).strip()
        # Qwen reasoning variants can include a private thinking block in plain
        # generated text. The website should display only the final answer.
        reply = re.sub(r"<think>.*?</think>", "", reply, flags=re.DOTALL).strip()

        if not reply:
            return {"reply": "I could not prepare a concise portfolio answer. Please try again."}

        return {"reply": reply}
