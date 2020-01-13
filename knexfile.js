// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/olympians_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/olympians_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://zgfilzlcxwpeeb:d8ad41def1d9915bbc1de35075a0ced568304eadd6378c9e139c149a372f94ca@ec2-174-129-33-120.compute-1.amazonaws.com:5432/d3gksd4grtjs7v',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
