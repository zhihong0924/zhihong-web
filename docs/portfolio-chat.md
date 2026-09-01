# Portfolio chat

## Purpose

The portfolio can offer a small, optional chat panel for visitors to ask public, professional questions about Chong Zhi Hong. It is not a general-purpose assistant, contact form, or source of private information.

## Architecture

```text
Browser chat panel -> POST /api/chat -> Modal shared LLM endpoint
```

The browser only calls the same-origin Next.js route. The route owns the curated professional context and retrieves the `MODAL_PROXY_TOKEN` from Vercel environment variables. The Modal token is never sent to the browser or committed to the repository.

Modal hosts a small `Qwen/Qwen3.5-4B` endpoint configured through Modal's managed endpoint command. Its OpenAI-compatible API is called from the route using a model endpoint ID supplied as `MODAL_MODEL_ID`.

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
2. Create a small managed endpoint, for example:

   ```bash
   modal endpoint create --model Qwen/Qwen3.5-4B
   ```

3. Create a Modal proxy token that can access that endpoint.
4. In Vercel, add these production and preview environment variables:

   ```text
   MODAL_PROXY_TOKEN=wk-...ws-...
   MODAL_MODEL_ID=<Modal endpoint hostname>
   ```

5. Add a rate-limit WAF rule before enabling the feature for public traffic. Start conservatively (for example, a few requests per minute per IP) and revise it after observing real usage.
6. Redeploy the site, then test short, factual questions such as “What projects has Zhihong built?” and an out-of-scope question that should be declined.

## Local development

Local UI development does not require Modal credentials. Without both variables, the route returns an intentional configuration error and the chat panel displays an unavailable state. Add the two variables only to an ignored local `.env` file if end-to-end testing is needed.

## Future work

Add usage monitoring, stronger provider-side moderation where appropriate, retrieval from a reviewed content source, and durable rate limiting only when traffic or portfolio content warrants them.
