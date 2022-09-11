

const public_v1_routes = () => {
    const apiNames = require("fs")
      .readdirSync(__dirname, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((item) => item.name);
   return apiNames
  };
  
  export default public_v1_routes;
  