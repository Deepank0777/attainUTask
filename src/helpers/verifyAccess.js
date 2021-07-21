const verifyAccess = (req, res, next) => {
  const user = req.user_id;

  if (user !== "admin")
    return res.status(401).send({ auth: false, message: "Access Denied!" });

  next();
};
module.exports = {
  verifyAccess,
};
