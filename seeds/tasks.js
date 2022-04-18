/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        {id: 1, name: "Some myLearning Course", description: "This course will deeply enrich your cyber knowledge.", link: "https://goto.website.com", special_instructions: "You need to request access to view this course, the approval process takes 7 business days.", module_id: 1},
        {id: 2, name: "Cyber Fundamentals", description: "In-person course designed to solidify your cybersecurity fundamentals.", link: "In-Person", special_instructions: "Coordinate with your crew commander to get put on the waitlist for this course.", module_id: 2},
        {id: 3, name: "Elite H4X0r Course", description: "Capstone for all previous courses.", link: "In-Person", special_instructions: "This course is held quarterly, starting on the second Tuesday of the third month.", module_id: 4},
        {id: 4, name: "Advanced Cybersecurity", description: "Online course to expand the members' awareness of modern issues in the cyber domain.", link: "https://login.governmentsite.mil", special_instructions: "Follow the link to submit your registration. ", module_id: 3}
      ]);
    });
};