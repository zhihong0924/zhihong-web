# Portfolio chat

## Purpose

The portfolio can offer a small, optional chat panel for visitors to ask public, professional questions about Chong Zhi Hong. It is not a general-purpose assistant, contact form, or source of private information.

## Architecture

```text
Browser chat panel -> POST /api/chat -> private Modal Web Function -> Qwen 3.5 0.8B on a T4 GPU
```

The browser only calls the same-origin Next.js route. The route owns the curated professional context and retrieves the `MODAL_PROXY_TOKEN` from Vercel environment variables. The Modal token is never sent to the browser or committed to the repository.

Modal hosts `Qwen/Qwen3.5-0.8B` through a custom Python Web Function in `modal/portfolio_chat.py`. This compact post-trained model is appropriate for the portfolio's small, curated factual context; upgrade to a larger model only if real responses show insufficient instruction-following. It runs on a T4 GPU, is limited to one container, and scales down after one idle minute. The Next.js route calls the private Web Function URL using a Modal proxy token. This avoids Modal's managed Shared Endpoint path, which currently requires a payment method for H100 access.

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
2. Create a proxy token for the private Web Function:

   ```bash
   modal workspace proxy-tokens create
   ```

   This prints a `wk-...` token ID and one-time `ws-...` secret. Join them with a period when setting `MODAL_PROXY_TOKEN`. Do not use the `ak-...` / `as-...` API credentials created by `modal setup`.

3. Deploy the custom Web Function from this repository:

   ```bash
   modal deploy modal/portfolio_chat.py
   ```

   Modal prints the protected `chat` function URL, marked with a key icon. Copy that complete URL.

4. Test the endpoint locally before connecting the website:

   ```bash
   curl "<MODAL_CHAT_URL>" \
     -H "Authorization: Bearer wk-...ws-..." \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Say hello in five words."}]}'
   ```

5. In Vercel, add these production and preview environment variables:

   ```text
   MODAL_PROXY_TOKEN=wk-...ws-...
   MODAL_CHAT_URL=<MODAL_CHAT_URL>
   ```

6. Add a rate-limit WAF rule before enabling the feature for public traffic. Start conservatively (for example, a few requests per minute per IP) and revise it after observing real usage.
7. Redeploy the site, then test short, factual questions such as “What projects has Zhihong built?” and an out-of-scope question that should be declined.

## Local development

Local UI development does not require Modal credentials. Without both variables, the route returns an intentional configuration error and the chat panel displays an unavailable state. Add the two variables only to an ignored local `.env` file if end-to-end testing is needed.

## Future work

Add usage monitoring, stronger provider-side moderation where appropriate, retrieval from a reviewed content source, and durable rate limiting only when traffic or portfolio content warrants them.
