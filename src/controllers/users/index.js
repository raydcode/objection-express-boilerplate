import { Users } from "../../../models";
import { encode } from "../../utils/jwt";


/**
 *  Create User and User Profile
 *  @param {Object} connection - knex Instance
 *  @param {String} full_name - full name of the user
 *  @param {String} email - email of the user
 *  @param {String} password - password of the user
 *  @param {String} mobile_no 	- mobile number
 */
export const createUser = ({
  connection,
  full_name,
  password,
  email,
  mobile_no,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Users.query(connection).insertGraph({
        full_name,
        password,
        email,
        mobile_no,
        user_profile: {
          full_name,
          email,
          mobile_no,
        },
      });

      resolve("User SignUp Process  100% Done !");
    } catch (error) {
      reject(error);
    }
  });
};

/**
 *  Generate User Access Token from JWT_SECRET
 *  @param {Object} user - Identified User Model Object
 *  @param {Object} connection - knex instance
 */
const generateUserAuthToken = async ({ connection, user }) => {
  const { id, full_name, email, mobile_no } = await user
    .$query(connection)
    .select("id", "full_name", "email", "mobile_no");
  return encode({ id, full_name, email, mobile_no });
};

/**
 *  Update Identified User
 *  @param {Object} user - Identified User Model Object
 *  @param {Object} connection - knex instance
 *  @param {String} email - Email of the user
 *  @param {Object} update_fields - Required fields for update
 */

const updateUser = async ({ user, connection, update_fields }) =>
  await user.$query(connection).update(update_fields);

/**
 *  Verify that the user is valid
 *  @param {Object} connection - knex instance
 *  @param {String} email - email of the user
 *  @param {String} password - password of the user
 */

export const verifyUser = ({ connection, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.query(connection).first().where({ email });

      const is_verified = await user.verifyPassword(password);
      if (!is_verified)
        return reject({ error: "Invalid Credentials", statusCode: 401 });

      resolve({
        message: "Access Granted !!",
        token: await generateUserAuthToken({ connection, user }),
      });

      updateUser({
        user,
        connection,
        update_fields: { last_logged_in: new Date() },
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 *  Reset User Password
 *  @param {Object} connection - knex instance
 *  @param {String} email - email of the user
 *  @param {String} password - new password of the user
 */

export const resetPassword = ({ connection, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.query(connection).first().where({ email });

      updateUser({ user, connection, update_fields: { password } });

      resolve("Your password has been reset successfully!");
    } catch (error) {
      reject(error);
    }
  });
};
