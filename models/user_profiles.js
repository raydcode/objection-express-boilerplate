const { Model } = require("objection");

class UserProfiles extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "user_profiles";
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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/users",
        join: {
          from: "user_profiles.user_id",
          to: "private.users.id",
        },
      },
    };
  }
}
module.exports = UserProfiles;
