/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('username').notNullable();
    table.string('rank');
    table.string('name');
    table.integer('crew_id');
    table.boolean('is_auth');
    table.boolean('is_trainer');
    table.boolean('is_approver');
    table.foreign('crew_id').references('id').inTable('crews');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};