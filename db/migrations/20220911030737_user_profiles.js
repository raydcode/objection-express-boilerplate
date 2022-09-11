/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("user_profiles", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("full_name");
    table.uuid("user_id").references("id").inTable("private.users");
    table.string("email").unique().notNullable();
    table.string("mobile_no");
    table.boolean("is_active").defaultTo(true);
    table.uuid("created_by").references("id").inTable("user_profiles");
    table.uuid("updated_by").references("id").inTable("user_profiles");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_profiles");
};
