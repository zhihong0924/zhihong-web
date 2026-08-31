# Database migrations

## Current policy

- Development and testing use a local PostgreSQL database named `zhihong_web` on `localhost:5432`.
- Neon is the production database and is changed only as part of an explicitly requested release.
- The project has not chosen an ORM or migration tool. Do not introduce one until a concrete data feature requires it.

## Local development

Use the active local connection strings in `.env`:

```env
DATABASE_URL="postgresql://chongzhihong@localhost:5432/zhihong_web"
DATABASE_URL_UNPOOLED="postgresql://chongzhihong@localhost:5432/zhihong_web"
```

The Neon production strings may remain in the same ignored `.env` file as commented-out alternatives. Never commit either set of connection strings.

## When a migration tool is selected

Before the first schema change, update this document with:

1. The selected tool and its version.
2. Exact commands for generating and applying a migration locally.
3. The one approved forward-only production command.
4. Commands for checking migration status and schema drift.
5. A rollback and data-recovery procedure.

## Production release checklist

1. Test the migration and affected application behavior locally.
2. Review the committed migration SQL. Stop for any destructive or data-rewriting operation unless the user has explicitly approved the plan.
3. Confirm the release is targeting the intended Neon production branch.
4. Confirm that Neon restore history or a separate backup is available.
5. Apply only the approved forward-only production migration command.
6. Verify schema status, application health, and affected data.

Neon branches and Schema Diff can be used for an additional pre-release review, but routine development stays local.
