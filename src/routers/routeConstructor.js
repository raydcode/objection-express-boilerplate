import public_v1_routes from "./v1/public";
import private_v1_routes from "./v1/private";

export const routeConstructor = {
  publicV1Routers: public_v1_routes(),
  privateV1Routers: private_v1_routes(),
};
