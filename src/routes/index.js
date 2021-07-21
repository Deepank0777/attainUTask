const router = require("express").Router();
const user_routes = require("./UserRoute");
const post_routes = require("./PostRoute");

router.use("/user", user_routes);
router.use("/post", post_routes);

module.exports = router;
