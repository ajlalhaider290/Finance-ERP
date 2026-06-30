import { Umzug, SequelizeStorage } from 'umzug';
import { QueryInterface } from 'sequelize';
import { sequelize } from '../config/db';

// Umzug wraps Sequelize migrations. Migration files live next to this one as
// `*.migration.ts` and export `up({ context })` / `down({ context })` where
// `context` is a Sequelize QueryInterface.
//
// CLI usage (via package.json scripts):
//   pnpm migrate            # apply pending migrations
//   pnpm migrate:down       # revert the last migration
//   pnpm migrate:status     # list pending / executed migrations
//   pnpm migrate:create --name add-something
export const migrator = new Umzug({
  migrations: {
    glob: ['*.migration.{ts,js}', { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeMeta' }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

export type MigrationContext = { context: QueryInterface };

if (require.main === module) {
  Promise.resolve(migrator.runAsCLI())
    .finally(async () => {
      await sequelize.close();
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
