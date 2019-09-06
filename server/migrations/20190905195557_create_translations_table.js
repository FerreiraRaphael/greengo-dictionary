
exports.up = async function(knex) {
  await knex.schema.createTable('translations', (t) => {
    t.uuid('id').primary();
    t.string('phrase').notNullable();
    t.enum('type', ['exp', 'n', 'adj', 'prov', 'quo', 'v']).notNullable();
    t.string('description').notNullable();
    t.string('translation').notNullable();
    t.string('userName').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('translations');
};
