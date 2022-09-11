//Router Params Validator
import { body } from "express-validator";

export const signUpSchema = [
  body("full_name")
    .not()
    .isEmpty()
    .withMessage("username field must NOT be empty")
    .trim(),
  body("password")
    .isLength({ min: 5, max: 20 })
    .not()
    .isEmpty()
    .withMessage("password field must NOT be empty")
    .trim(),
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("email field must NOT be empty")
    .trim(),
  body("mobile_no")
    .not()
    .isEmpty()
    .withMessage("mobile_no field must NOT be empty")
    .trim(),
];

export const verifyUserSchema = [
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("email field must NOT be empty")
    .trim(),
  body("password")
    .isLength({ min: 5, max: 20 })
    .not()
    .isEmpty()
    .withMessage("password field must NOT be empty")
    .trim(),
];
