exports.up = async (knex) => {
  await knex.schema.createTable('bookings', async (table) => {
    table.increments('id').primary();
    table.integer('roomId').unsigned().notNullable();
    table.foreign('roomId').references('id').inTable('rooms');
    table.integer('customerId').unsigned().notNullable();
    table.foreign('customerId').references('id').inTable('customers');
    table.datetime('from');
    table.datetime('to');
    table
      .enu('status', ['Pending', 'Cancelled', 'In progess', 'Completed'])
      .defaultTo('Pending');
    table
      .enu('payment', ['Pending', 'In progress', 'Paid'])
      .defaultTo('Pending');
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bookings');
};
