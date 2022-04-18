/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('modules').del()
    .then(function () {
      return knex('modules').insert([
        {id: 1, name: "MDT 101", operator_level: "Basic", is_approved: true},
        {id: 2, name: "MDT 102", operator_level: "Basic", is_approved: true},
        {id: 3, name: "MDT 200", operator_level: "Intermediate", is_approved: true},
        {id: 4, name: "MDT 300", operator_level: "Advanced", is_approved: false}
      ]);
    });
};