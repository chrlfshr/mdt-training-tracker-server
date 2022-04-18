/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: "john.doe.1", rank: "Specialist 2", name: "John E. Doe", crew_id: 1, is_auth: false, is_trainer: false, is_approver: false},
        {id: 2, username: "jane.doe.1", rank: "Sergeant", name: "Jane A. Doe", crew_id: 1, is_auth: false, is_trainer: true, is_approver: false},
        {id: 3, username: "harold.hutchins.1", rank: "Master Sergeant", name: "Harold H. Hutchins", crew_id: 5, is_auth: true, is_trainer: true, is_approver: false},
        {id: 4, username: "martha.walker.1", rank: "Major", name: "Martha. R. Walker", crew_id: 6, is_auth: false, is_trainer: false, is_approver: true}
      ]);
    });
};