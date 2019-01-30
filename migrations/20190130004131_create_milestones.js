
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', (table) => {
    table.string('description');
    tale.date('date_achieved');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
