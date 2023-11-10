import knex from 'knex';

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "cars",
    user: "postgres",
    password: "123",
  },
});

export default knexInstance;
