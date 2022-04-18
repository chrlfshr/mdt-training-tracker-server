/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('crews').del()
    .then(function () {
      return knex('crews').insert([
        {id: 1, name: "Alpha"},
        {id: 2, name: "Bravo"},
        {id: 3, name: "Charlie"},
        {id: 4, name: "Delta"},
        {id: 5, name: "Training Backshop"},
        {id: 6, name: "Unit Staff"}
      ]);
    });
};