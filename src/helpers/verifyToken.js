const jwt = require("jsonwebtoken");
const { LOGIN_SECRET, JWT_THRESHOLD } = require("../config");
const { CustomError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(400).send({ auth: false, message: "No token provided." });

  jwt.verify(token, LOGIN_SECRET, function(err, decoded) {
    if (err)
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user_id = decoded.user_id;
    req.user_system_id = decoded.id;
    next();
  });
};
module.exports = {
  verifyToken,
};
