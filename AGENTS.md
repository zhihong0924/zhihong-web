# Zhihong Web — Development Guide

## Project purpose

This is a personal website. Favor a polished, fast, accessible, and low-maintenance experience over feature complexity.

## Stack

- Next.js App Router, TypeScript, and Tailwind CSS v4.
- Neon Postgres is reserved for production. Use the local PostgreSQL database for normal development and testing.
- Keep production dependencies minimal. Ask before adding a substantial dependency such as an ORM, authentication provider, analytics, payments, or an external integration.

## Documentation

- [README.md](README.md) is the source for setup, commands, and the architecture overview.
- `docs/` holds only major feature and architecture decisions.
- Read [docs/database-migrations.md](docs/database-migrations.md) before selecting a migration tool or making any database schema change.
- Keep documentation aligned with the implemented behavior; do not create documentation for minor styling or copy-only edits.

## Required workflow

1. Inspect the relevant code and documentation before changing behavior.
2. State a concise plan covering the affected files, user-visible outcome, and validation.
3. Record a material feature, architecture, data, or design decision before implementation.
4. Make the smallest coherent change and avoid unrelated refactors.
5. Run focused checks while implementing.
6. Run `npm run lint` and `npm run build` before completion.
7. Cross-check the completed behavior against the relevant documentation and update anything stale.
8. Commit every completed feature or cohesive user-visible change after it passes validation. Stage only files belonging to that change, use a concise conventional commit message, and report the resulting commit hash. Do not include unrelated user changes, `.env` files, secrets, or incomplete work.

## UI quality

- Design for mobile and desktop together.
- Check responsive layout, readable type, keyboard navigation, semantic HTML, and sufficient colour contrast.
- Prefer reusable components and design tokens over one-off styles.
- Avoid unnecessary animation and client-side JavaScript.
- After any user-visible UI change, include the local preview URL [Open the UI in Codex](http://localhost:3000) in the final response. This lets the user open Codex's web-preview card and leave visual comments directly on the page. State if the local dev server must be started with `npm run dev` first.

## Data and security

- Never commit secrets or `.env` files.
- Use `DATABASE_URL` for app database access. Reserve `DATABASE_URL_UNPOOLED` for tools that explicitly require a direct connection.
- Treat the Neon default branch as production. Do not make Neon changes during routine development.

## Production database changes

- Treat every Neon production database write, including schema migrations, backfills, and manual SQL, as a release operation.
- Run a production database command only when the user explicitly requests a production release or migration.
- Test schema changes locally first, use committed forward-only migrations, and review the generated SQL before release.
- Before production, confirm the intended Neon target and that an appropriate Neon restore point/history window or backup is available.
- Destructive or data-rewriting changes require a documented migration and rollback plan plus explicit user approval.
- Never use development, reset, or automatic schema-push commands against production.
- After a production migration, verify migration status, application health, and affected data.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
