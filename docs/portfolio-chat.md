# Portfolio chat

## Purpose

The portfolio can offer a small, optional chat panel for visitors to ask public, professional questions about Chong Zhi Hong. It is not a general-purpose assistant, contact form, or source of private information.

## Architecture

```text
Browser chat panel -> POST /api/chat -> Modal model backend
```

The browser only calls the same-origin Next.js route. The route retrieves the `MODAL_PROXY_TOKEN` from Vercel environment variables. The Modal token is never sent to the browser or committed to the repository. Model responses are passed through as server-sent events (SSE), allowing the browser to render each generated chunk rather than wait for a completed answer.

Published portfolio knowledge lives in `content/portfolio-context.md`. The route splits this Markdown into sections and selects the three highest-scoring sections for the visitor’s latest question before sending context to Modal. This is a lightweight lexical RAG layer: it requires no database, embeddings, or extra service, and keeps the prompt focused as the Markdown grows. `next.config.ts` explicitly traces the Markdown file so it is included in deployed route bundles.

The default backend is a Modal managed Endpoint. Its OpenAI-compatible API is called using the endpoint URL shown in the Modal dashboard and the base Qwen repository ID supplied as environment variables.

For a lower-cost cold-start experiment, `modal_cpu_chat.py` defines a separate, CPU-only Modal Web Function. It runs Qwen 0.8B from a persistent Modal Volume with four physical CPU cores and keeps a used container alive for five minutes. Its protected URL is selected by `MODAL_CPU_CHAT_URL`; removing that variable immediately returns the site to the managed GPU Endpoint.

## Presentation

The chat is a primary, in-page experience immediately after the hero rather than a floating support widget. It opens with curated questions and a large prompt. Once a visitor sends their first question, the introductory editorial copy disappears and the interface becomes a full-bleed light conversation workspace, with messages and the composer centered in a readable column. This keeps the homepage approachable while giving an active conversation the space it needs.

## Boundaries and safety

- Reject requests outside Zhihong's published professional profile, projects, experience, recognition, or public contact options before calling Modal. This deterministic topic gate also rejects prompt-injection-shaped requests; the model receives only in-scope questions.
- Answer only using retrieved, public sections from `content/portfolio-context.md`.
- If the information is not present, answer that it is not included in the published portfolio rather than guessing.
- Do not expose private, personal, credential, employer-confidential, or visitor-provided sensitive information.
- Keep requests small: at most six short conversation messages; limit model output to 120 tokens and direct it to stay within 90 words unless the visitor explicitly asks for more detail.
- The managed GPU Endpoint retries temporary warm-up failures for up to roughly one minute. The CPU experiment instead permits one request to run for up to 55 seconds, because its normal CPU generation time can exceed the GPU backend's short per-attempt timeout. This avoids aborting healthy CPU inference and creating duplicate generations.
- Do not store conversations or add a database for the initial release.
- Keep the chat unavailable until `MODAL_PROXY_TOKEN` and either the managed Endpoint variables or `MODAL_CPU_CHAT_URL` are configured.
- Before enabling production chat, add a Vercel WAF rate-limit rule for `POST /api/chat`. A client-side cooldown is only a usability aid, not abuse protection.

## Setup and deployment

1. Create a Modal Starter account and install/authenticate the Modal CLI locally.
2. Create a managed endpoint in the default US West routing region. For a low-traffic portfolio, start with the compact 0.8B model:

   ```bash
   modal endpoint create --model Qwen/Qwen3.5-0.8B
   ```

   Wait for the endpoint status to become `live`. Open the dashboard link from the create command and copy its **Endpoint URL** (without a trailing slash).

3. Create a restricted proxy token that can access the endpoint:

   ```bash
   modal workspace proxy-tokens create
   ```

   This prints a `wk-...` token ID and one-time `ws-...` secret. Join them with a period in the next step. Do not use the `ak-...` / `as-...` API credentials created by `modal setup`.

4. Test the endpoint locally before connecting the website:

   ```bash
   curl "<ENDPOINT_URL>/v1/chat/completions" \
     -H "Authorization: Bearer wk-...ws-..." \
     -H "Content-Type: application/json" \
     -d '{"model":"Qwen/Qwen3.5-0.8B","messages":[{"role":"user","content":"Say hello in five words."}]}'
   ```

5. In Vercel, add these production and preview environment variables:

   ```text
   MODAL_PROXY_TOKEN=wk-...ws-...
   MODAL_API_BASE_URL=<ENDPOINT_URL>/v1
   MODAL_MODEL_ID=Qwen/Qwen3.5-0.8B
   ```

6. Add a rate-limit WAF rule before enabling the feature for public traffic. Start conservatively (for example, a few requests per minute per IP) and revise it after observing real usage.
7. Redeploy the site, then test short, factual questions such as “What projects has Zhihong built?” and an out-of-scope question that should be declined.

## Local development

Local UI development does not require Modal credentials. Without all three variables, the route returns an intentional configuration error and the chat panel displays an unavailable state. Add the three variables only to an ignored local `.env` file if end-to-end testing is needed.

## CPU-only experiment

The managed Endpoint currently does not expose a CPU-only setting. To test a CPU backend without deleting it:

1. Deploy the custom Modal Web Function from this repository:

   ```bash
   modal deploy modal_cpu_chat.py
   ```

   The command prints a protected URL ending in `modal.run`. The first deployment/request downloads the model into a Modal Volume. Later containers reuse those cached weights.

2. Add these Vercel and local `.env` variables, then redeploy/restart Next.js:

   ```text
   MODAL_PROXY_TOKEN=wk-...ws-...
   MODAL_CPU_CHAT_URL=https://<workspace>--zhihong-portfolio-cpu-chat.modal.run
   ```

   Leave the existing `MODAL_API_BASE_URL` and `MODAL_MODEL_ID` values in place. They are ignored while `MODAL_CPU_CHAT_URL` exists, making rollback a one-variable change.

3. Test a short factual question. A warm container streams generated response chunks to the browser as soon as inference begins; a cold start still waits for the model to load before its first chunk. The CPU container scales to zero when unused and remains warm for five minutes after a request. Watch startup time, response time, and CPU/memory cost in the Modal dashboard before deciding whether to keep it.

## Future work

Add usage monitoring, stronger provider-side moderation where appropriate, retrieval from a reviewed content source, and durable rate limiting only when traffic or portfolio content warrants them.
