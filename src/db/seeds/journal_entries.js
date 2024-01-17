/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('journal_entries').del()
  await knex('journal_entries').insert([
    {date: '1/17', content: 'Today was a day.' },
    {date: '1/16', content: 'Today was tiring.'}
  ]);
};
