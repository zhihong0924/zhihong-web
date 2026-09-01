"""Private, scale-to-zero Modal backend for the portfolio chat.

Deploy with:
    modal deploy modal/portfolio_chat.py
"""

from typing import Any

import modal

APP_NAME = "zhihong-portfolio-chat"
MODEL_ID = "Qwen/Qwen3.5-0.8B"

app = modal.App(APP_NAME)
image = modal.Image.debian_slim(python_version="3.12").uv_pip_install(
    "accelerate>=1.6.0",
    "fastapi[standard]",
    "transformers[torch]>=4.57.0",
)
model_cache = modal.Volume.from_name("zhihong-portfolio-chat-model-cache", create_if_missing=True)

# A container can serve more than one request before Modal scales it down. Keeping
# the pipeline at module scope avoids loading the model again for those requests.
chatbot: Any | None = None


@app.function(
    image=image,
    gpu="T4",
    timeout=120,
    scaledown_window=60,
    max_containers=1,
    volumes={"/root/.cache/huggingface": model_cache},
)
@modal.fastapi_endpoint(method="POST", requires_proxy_auth=True, docs=False)
def chat(payload: dict[str, Any]) -> dict[str, str]:
    """Generate one response from a small public Qwen instruction model."""
    global chatbot

    messages = payload.get("messages")
    if not isinstance(messages, list) or not messages:
        return {"error": "A non-empty messages array is required."}

    if chatbot is None:
        from transformers import pipeline

        chatbot = pipeline("image-text-to-text", model=MODEL_ID, device_map="cuda")

    result = chatbot(
        messages,
        do_sample=False,
        max_new_tokens=280,
        return_full_text=True,
    )
    generated = result[0]["generated_text"]
    reply = generated[-1].get("content", "").strip()

    if not reply:
        return {"error": "The model did not return a response."}

    return {"reply": reply}
