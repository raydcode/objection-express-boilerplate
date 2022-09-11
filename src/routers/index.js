import { Router } from "express";
import DB from "../../db";
import isAuthenticated from "../middlewares/auth";
import { routeConstructor } from "./routeConstructor";
const RoutesV1 = Router();
const path = require("path");

/**
 *  Routes Constructors
 */
const { publicV1Routers, privateV1Routers } = routeConstructor;

// You Can Use Knex Instance For All Routes
RoutesV1.use((req, res, next) => {
  try {
    req.body["connection"] = DB;
    next();
  } catch (error) {
    throw new Error(error);
  }
});

/**
 *   Create Routes Dynamically
 */

// Router Vesion - v1 ---
publicV1Routers.forEach((item) => {
  var route = require(path.join(__dirname + "/v1/public", item));
  RoutesV1.use(`/${item}/`, route);
});

privateV1Routers.forEach((item) => {
  var route = require(path.join(__dirname + "/v1/private", item));
  // Need to add auth middleware
  RoutesV1.use(`/${item}/`, isAuthenticated, route);
});
// Router Vesion - v1 ---

export { RoutesV1 };
