/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('modules', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('name').notNullable();
    table.string('operator_level');
    table.boolean('is_approved');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('modules');
};