/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('requests').del()
    .then(function () {
      return knex('requests').insert([
        {id: 1, name: "Curriculum Extension", is_submitted: true, description: "We need to add more material so our operators can expand their knowledge horizons.", module_id: 4}
      ]);
    });
};