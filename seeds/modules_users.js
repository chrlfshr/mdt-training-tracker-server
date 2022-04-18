/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('modules_users').del()
    .then(function () {
      return knex('modules_users').insert([
        {module_id: 1, user_id: 1, is_started: true, is_completed: false, deadline: "05-01-2022"},
        {module_id: 2, user_id: 1, is_started: false, is_completed: false, deadline: "08-01-2022"},
        {module_id: 1, user_id: 2, is_started: true, is_completed: true, deadline: "01-01-2022"},
        {module_id: 2, user_id: 2, is_started: true, is_completed: true, deadline: "04-01-2022"},
        {module_id: 1, user_id: 3, is_started: true, is_completed: true, deadline: "01-01-2021"},
        {module_id: 2, user_id: 3, is_started: true, is_completed: true, deadline: "04-01-2021"},
        {module_id: 3, user_id: 3, is_started: true, is_completed: false, deadline: "06-01-2022"},
        {module_id: 1, user_id: 4, is_started: true, is_completed: true, deadline: "01-01-2021"},
        {module_id: 2, user_id: 4, is_started: true, is_completed: true, deadline: "04-01-2021"},
        {module_id: 3, user_id: 4, is_started: true, is_completed: true, deadline: "04-01-2022"},
      ]);
    });
};