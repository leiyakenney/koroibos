
exports.up = function(knex) {
  return Promise.all([
  knex.schema.createTable('olympians', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('sex');
    table.string('age');
    table.string('height');
    table.string('weight');
    table.string('team');
    table.string('games');
    table.string('sport');
    table.string('event');
    table.string('medal');

    table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympians')
  ]);
}
