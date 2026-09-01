# Zhihong's website

A lightweight personal website built with Next.js, React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev    # start development server
npm run lint   # run ESLint
npm run build  # create production build (Webpack mode)
npm run start  # run production build locally
```

## Included by design

- Next.js App Router and React
- TypeScript with strict checking
- Tailwind CSS v4
- ESLint with Next.js Core Web Vitals rules

Database, authentication, i18n, UI kits, testing, and deployment integrations can be added when a concrete site feature requires them.

## Portfolio chat

The optional portfolio chat uses a Modal-hosted model behind a Next.js API route. It is intentionally unavailable until deployment secrets are configured; see [docs/portfolio-chat.md](docs/portfolio-chat.md) for the architecture, Modal setup, and production rate-limit requirement.

## Project guidance

- [AGENTS.md](AGENTS.md) defines the development workflow and quality bar.
- [docs/database-migrations.md](docs/database-migrations.md) defines local and production database safety rules.
