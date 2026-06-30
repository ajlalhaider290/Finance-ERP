# Migrations

Sequelize schema changes flow through [umzug](https://github.com/sequelize/umzug) here. Production never runs `sequelize.sync({ alter: true })` — only migrations.

## Commands

```bash
pnpm migrate            # apply all pending migrations
pnpm migrate:down       # revert the most recent migration
pnpm migrate:status     # show pending + executed
pnpm migrate:create --name add-something-new
```

## Writing a migration

Every file in this directory whose name ends in `.migration.ts` is picked up. Keep the `YYYYMMDDHHMMSS-description.migration.ts` convention so ordering is lexicographic.

```ts
import type { MigrationContext } from './umzug';

export async function up({ context: qi }: MigrationContext): Promise<void> {
  await qi.addColumn('users', 'date_of_birth', { type: 'TIMESTAMPTZ', allowNull: true });
}

export async function down({ context: qi }: MigrationContext): Promise<void> {
  await qi.removeColumn('users', 'date_of_birth');
}
```

## Baseline

`20260101000000-baseline.migration.ts` bootstraps a fresh database from the current model definitions via `sequelize.sync({ force: false })`. It runs exactly once. Do not edit it or add another `sync()` call in any later migration.

## Dev shortcut

Setting `SYNC_DB=true` in `.env` (development only) keeps the legacy auto-sync behavior and bypasses migrations. Never set it in production.
