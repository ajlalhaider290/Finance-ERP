import { sequelize } from '../config/db';
import type { MigrationContext } from './umzug';

// Baseline migration — runs once on a fresh database to create the initial
// schema from the current Sequelize model definitions. After this runs, every
// schema change MUST be a new `*.migration.ts` file using queryInterface
// (addColumn, changeColumn, addIndex, etc.) or raw SQL.
//
// Do NOT call sequelize.sync() from any later migration. That path exists only
// here, for the initial bootstrap.
export async function up(_ctx: MigrationContext): Promise<void> {
  await sequelize.sync({ force: false });
}

export async function down(_ctx: MigrationContext): Promise<void> {
  throw new Error(
    'Cannot revert the baseline migration programmatically. Drop the database manually and re-run `pnpm migrate` for a clean rebuild.',
  );
}
