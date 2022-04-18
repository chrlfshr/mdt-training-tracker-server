/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('name').notNullable();
    table.text('description', 'longtext');
    table.string('link');
    table.text('special_instructions', 'longtext');
    table.integer('module_id');
    table.foreign('module_id').references('modules.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('tasks', table => {
    table.dropForeign('module_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('tasks');
  });
};