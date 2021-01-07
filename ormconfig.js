// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');

console.log(config.get('NODE_ENV'));
console.log(process.env.NODE_ENV);

module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['src/*/entities/*.ts'],
    migrationsTableName: 'typeorm_migrations',
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations',
    },
};
