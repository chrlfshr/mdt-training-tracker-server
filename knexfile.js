// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'ec2-23-20-224-166.compute-1.amazonaws.com',
      port: 5432,
      database: 'd8e3mjf92qii2l',
      user:     'lzjbehctblwxdo',
      password: "",
      ssl: { rejectUnauthorized: false }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'ec2-23-20-224-166.compute-1.amazonaws.com',
      port: 5432,
      database: 'd8e3mjf92qii2l',
      user:     'lzjbehctblwxdo',
      password: "",
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-23-20-224-166.compute-1.amazonaws.com',
      port: 5432,
      database: 'd8e3mjf92qii2l',
      user:     'lzjbehctblwxdo',
      password: "",
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
