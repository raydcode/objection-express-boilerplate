/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema
    .withSchema("private")
    .createTableIfNotExists("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("full_name");
      table.string("password");
      table.string("email").unique().notNullable();
      table.string("mobile_no");
      table.boolean("is_active").defaultTo(true);
      table.uuid("created_by").references("id").inTable("private.users");
      table.uuid("updated_by").references("id").inTable("private.users");
      table.dateTime("last_logged_in");
      table.dateTime("created_at").defaultTo(knex.fn.now());
      table.dateTime("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.withSchema("private").dropTableIfExists("users");
};
