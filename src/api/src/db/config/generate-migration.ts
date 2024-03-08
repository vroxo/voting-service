import { execSync } from 'child_process';

const migrationName = process.argv[2];

console.log('CREATING MIGRATION: ', migrationName);

if (!migrationName) {
  console.error(
    'Please provide a migration name: npm run migrate:generate <migration-name>',
  );
  process.exit(1);
}

execSync(
  `npm run typeorm -- migration:generate src/db/config/migrations/${migrationName} --pretty`,
);
