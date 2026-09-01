# Portfolio chat

## Purpose

The portfolio can offer a small, optional chat panel for visitors to ask public, professional questions about Chong Zhi Hong. It is not a general-purpose assistant, contact form, or source of private information.

## Architecture

```text
Browser chat panel -> POST /api/chat -> Modal shared LLM endpoint
```

The browser only calls the same-origin Next.js route. The route owns the curated professional context and retrieves the `MODAL_PROXY_TOKEN` from Vercel environment variables. The Modal token is never sent to the browser or committed to the repository.

Modal hosts the selected Qwen model through a managed Shared Endpoint. Its OpenAI-compatible API is called through Modal's regional shared base URL. The endpoint's name, shown by `modal endpoint list`, becomes the model hostname supplied as an environment variable.

## Boundaries and safety

- Answer only using the curated, public portfolio context in `app/api/chat/route.ts`.
- If the information is not present, answer that it is not included in the published portfolio rather than guessing.
- Do not expose private, personal, credential, employer-confidential, or visitor-provided sensitive information.
- Keep requests small: at most six short conversation messages; limit model output to 280 tokens.
- Do not store conversations or add a database for the initial release.
- Keep the chat unavailable until both Modal environment variables are configured.
- Before enabling production chat, add a Vercel WAF rate-limit rule for `POST /api/chat`. A client-side cooldown is only a usability aid, not abuse protection.

## Setup and deployment

1. Create a Modal Starter account and install/authenticate the Modal CLI locally.
2. Create a managed endpoint in the default US West routing region. For a low-traffic portfolio, start with the compact 0.8B model:

   ```bash
   modal endpoint create --model Qwen/Qwen3.5-0.8B
   ```

   Wait for the endpoint status to become `live`. The endpoint name printed by `modal endpoint list --json` is needed in step 5.

3. Create a restricted proxy token that can access the endpoint:

   ```bash
   modal workspace proxy-tokens create
   ```

   This prints a `wk-...` token ID and one-time `ws-...` secret. Join them with a period in the next step. Do not use the `ak-...` / `as-...` API credentials created by `modal setup`.

4. Test the endpoint locally before connecting the website:

   ```bash
   curl "https://inference.us-west.modal.direct/v1/chat/completions" \
     -H "Authorization: Bearer wk-...ws-..." \
     -H "Content-Type: application/json" \
     -d '{"model":"<endpoint-name>.us-west.modal.direct","messages":[{"role":"user","content":"Say hello in five words."}]}'
   ```

5. In Vercel, add these production and preview environment variables:

   ```text
   MODAL_PROXY_TOKEN=wk-...ws-...
   MODAL_API_BASE_URL=https://inference.us-west.modal.direct/v1
   MODAL_MODEL_ID=<endpoint-name>.us-west.modal.direct
   ```

   If you selected another routing region when creating the endpoint, replace `us-west` in both values with that region.

6. Add a rate-limit WAF rule before enabling the feature for public traffic. Start conservatively (for example, a few requests per minute per IP) and revise it after observing real usage.
7. Redeploy the site, then test short, factual questions such as “What projects has Zhihong built?” and an out-of-scope question that should be declined.

## Local development

Local UI development does not require Modal credentials. Without all three variables, the route returns an intentional configuration error and the chat panel displays an unavailable state. Add the three variables only to an ignored local `.env` file if end-to-end testing is needed.

## Future work

Add usage monitoring, stronger provider-side moderation where appropriate, retrieval from a reviewed content source, and durable rate limiting only when traffic or portfolio content warrants them.
