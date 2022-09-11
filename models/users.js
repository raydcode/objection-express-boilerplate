const { Model, compose } = require("objection");

// import the plugin
const Password = require("objection-password")({
  allowEmptyPassword: true,
});
const Unique = require("objection-unique")({
  fields: ["email", "full_name"],
  identifiers: ["id"],
});

const Mixins = compose(Password, Unique);

class Users extends Mixins(Model) {
  // Table name is the only required property.

  static get tableName() {
    return "private.users";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            pinCode: { type: "string" },
          },
        },
      },
    };
  }
  static get relationMappings() {
    return {
      user_profile: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + "/user_profiles",
        join: {
          from: "private.users.id",
          to: "user_profiles.user_id",
        },
      },
    };
  }
}
module.exports = Users;
