
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('Game', function (tbl) {
        tbl.increments().primary();
        tbl.integer('Score');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Game')
};
