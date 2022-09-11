import jwt from "jsonwebtoken";

export const encode = (payload, expiry_time) => {
  let config = {};
  if (!expiry_time) {
    config["expiresIn"] = "2h";
  } else {
    config["expiresIn"] = expiry_time;
  }

  return jwt.sign(payload, process.env.JWT_SECRET, config);
};

export const decode = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET);
};

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);
      resolve(decode(token));
    } catch (error) {
      reject(error);
    }
  });
};
