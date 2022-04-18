/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('tasks_users', table => {
    table.integer('task_id');
    table.integer('user_id');
    table.boolean('is_started');
    table.boolean('is_completed');
    table.boolean('is_validated');
    table.foreign('task_id').references('tasks.id');
    table.foreign('user_id').references('users.id');
    table.primary(['task_id', 'user_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('tasks_users', table => {
    table.dropForeign('task_id');
    table.dropForeign('user_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('tasks_users');
  });
};