const router = require("express").Router();
const user_controller = require("../controllers/UserController");

router.post("/", user_controller.register);
router.post("/login", user_controller.login);
router.post("/role", user_controller.role);
router.post("/asign-role", user_controller.assignRole);

module.exports = router;
