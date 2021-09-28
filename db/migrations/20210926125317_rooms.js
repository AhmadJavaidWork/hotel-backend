exports.up = async (knex) => {
  await knex.schema.createTable('rooms', async (table) => {
    table.increments('id').primary();
    table.integer('floor', 3).unsigned().notNullable();
    table.integer('rent', 3).unsigned().notNullable();
    table.boolean('booked').defaultTo(false);
    table.boolean('deleted').defaultTo(false);
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON rooms
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('rooms');
};
