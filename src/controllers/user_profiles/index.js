import { UserProfiles } from "../../../models";

/**
 *  Get User Profile information
 *  @param {Object} connection - knex Instance
 *  @param {String(uuid)} user_id - User identifier
 */

export const getInfo = ({ connection, user_id }) => {
  return new Promise((resolve, reject) => {
    try {
      const userInfo = UserProfiles.query(connection)
        .first()
        .where({ user_id });

      if (!userInfo) return reject({ statusCode: 403, message: "Forbidden" });

      return resolve(userInfo);
    } catch (error) {
      reject(error);
    }
  });
};
