const Joi = require("@hapi/joi");
const {
  registerPost,
  getPost,
  updatePost,
  deletePost,
} = require("../services/PostService");
const { CustomError } = require("../helpers/error");
const {
  POST_REGISTER_SUCCESS_MESSAGE,
  POST_FETCH_SUCCESS_MESSAGE,
  POST_UPDATE_SUCCESS_MESSAGE,
  POST_DELETE_SUCCESS_MESSAGE,
} = require("../config/constants");

module.exports = {
  createPost: async (req, res, next) => {
    const { body } = req;
    try {
      const { error, value } = Joi.object({
        post: Joi.string().required(),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      value.user_system_id = req.user_system_id;
      const { _id, post } = await registerPost(value);
      return res.status(201).json({
        success: true,
        message: POST_REGISTER_SUCCESS_MESSAGE,
        data: { _id, post },
      });
    } catch (err) {
      next(err);
    }
  },
  fetchPost: async (req, res, next) => {
    const { query } = req;
    try {
      const { error, value } = Joi.object({
        start: Joi.string(),
        limit: Joi.string(),
      }).validate(query);

      if (error) throw new CustomError(400, error.details[0].message);

      const [[{ count }], rows] = await getPost(value);
      res.status(200).json({
        success: true,
        message: POST_FETCH_SUCCESS_MESSAGE,
        data: { count, rows },
      });
    } catch (err) {
      next(err);
    }
  },
  updatePost: async (req, res, next) => {
    const { body } = req;
    const post_id = req.params.post_id;
    try {
      const { error, value } = Joi.object({
        post: Joi.string().required(),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      value.post_id = post_id;
      value.user_system_id = req.user_system_id;
      const { post } = await updatePost(value);
      res.status(204).json({
        // success: true,
        // message: POST_UPDATE_SUCCESS_MESSAGE,
        // data: post,
      });
    } catch (err) {
      next(err);
    }
  },
  deletePost: async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
      await deletePost({ post_id });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
};
