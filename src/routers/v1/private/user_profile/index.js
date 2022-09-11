import { Router } from "express";
import { validationResult } from "express-validator";
import { getInfo } from "../../../../controllers/user_profiles";


const routes = Router();

routes.post("/", async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await getInfo(req.body);
    res.status(200).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});


module.exports = routes;
