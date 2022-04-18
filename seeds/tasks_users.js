/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('tasks_users').del()
    .then(function () {
      return knex('tasks_users').insert([
        {task_id: 1, user_id: 1, is_started: true, is_completed: false, is_validated: false},
        {task_id: 2, user_id: 1, is_started: false, is_completed: false, is_validated: false},
        {task_id: 1, user_id: 2, is_started: true, is_completed: true, is_validated: true},
        {task_id: 2, user_id: 2, is_started: true, is_completed: true, is_validated: true},
        {task_id: 1, user_id: 3, is_started: true, is_completed: true, is_validated: true},
        {task_id: 2, user_id: 3, is_started: true, is_completed: true, is_validated: true},
        {task_id: 3, user_id: 3, is_started: true, is_completed: false, is_validated: false},
        {task_id: 1, user_id: 4, is_started: true, is_completed: true, is_validated: true},
        {task_id: 2, user_id: 4, is_started: true, is_completed: true, is_validated: true},
        {task_id: 3, user_id: 4, is_started: true, is_completed: true, is_validated: true}
      ]);
    });
};