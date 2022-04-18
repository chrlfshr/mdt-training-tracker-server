/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('modules_users', table => {
    table.integer('module_id');
    table.integer('user_id');
    table.boolean('is_started');
    table.boolean('is_completed');
    table.date('deadline');
    table.foreign('module_id').references('modules.id');
    table.foreign('user_id').references('users.id');
    table.primary(['module_id', 'user_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('modules_users', table => {
    table.dropForeign('module_id');
    table.dropForeign('user_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('modules_users');
  });
};