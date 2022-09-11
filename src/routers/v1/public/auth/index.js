import { Router } from "express";
import { validationResult } from "express-validator";
import {
  createUser,
  verifyUser,
  resetPassword,
} from "../../../../controllers/users";
import { signUpSchema, verifyUserSchema } from "./schema";

const routes = Router();

routes.post("/signup", signUpSchema, async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await createUser(req.body);
    res.status(201).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

routes.post("/login", verifyUserSchema, async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await verifyUser(req.body);
    res.status(200).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

routes.post("/reset-password", verifyUserSchema, async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await resetPassword(req.body);
    res.status(200).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

module.exports = routes;
