const router = require("express").Router();
const post_controller = require("../controllers/PostController");
const AUTH = require("../helpers/verifyToken").verifyToken;
const AUTHORIZATION = require("../helpers/verifyAccess").verifyAccess;

router.post("/", AUTH, AUTHORIZATION, post_controller.createPost);
router.get("/", AUTH, post_controller.fetchPost);
router.put("/:post_id", AUTH, AUTHORIZATION, post_controller.updatePost);
router.delete("/:post_id", AUTH, AUTHORIZATION, post_controller.deletePost);

module.exports = router;
