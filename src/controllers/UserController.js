const Joi = require("@hapi/joi");
const {loginUser, registerUser} = require("../services/UserService");
const { CustomError } = require("../helpers/error");
const {
  LOGIN_SUCCESS_MESSAGE,
  SIGNUP_SUCCESS_MESSAGE,
  ROLE_SUCCESS_MESSAGE,
  ROLE_ASSIGN_SUCCESS_MESSAGE,
} = require("../config/constants");

module.exports = {
  register: async (req, res, next) => {
    const { body } = req;
    try {
      const { error, value } = Joi.object({
        userId: Joi.string().required(),
        password: Joi.string().required(),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      const {_id, user_id:userId} = await registerUser(value);
      res.status(201).json({
        success: true,
        message: SIGNUP_SUCCESS_MESSAGE,
        data: {_id, userId},
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const { body } = req;
    try {
      const { error, value } = Joi.object({
        userId: Joi.string().required(),
        password: Joi.string().required(),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      const { token, JWT_THRESHOLD:expires_in } = await loginUser(value);
      res.status(200).json({
        success: true,
        message: LOGIN_SUCCESS_MESSAGE,
        data: { token, expires_in },
      });
    } catch (err) {
      next(err);
    }
  },

  role: async (req, res, next) => {
    const { body } = req;
    try {
      const { error, value } = Joi.object({
        role: Joi.string()
          .required()
          .valid("admin", "student"),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      await user_service.createRole(value);
      res.status(201).json({
        success: true,
        message: ROLE_SUCCESS_MESSAGE,
        data: "",
      });
    } catch (err) {
      next(err);
    }
  },

  assignRole: async (req, res, next) => {
    const { body } = req;
    try {
      const { error, value } = Joi.object({
        ref_role: Joi.string().required(),
        ref_user: Joi.string().required(),
      }).validate(body);

      if (error) throw new CustomError(400, error.details[0].message);

      await user_service.assignRole(value);
      res.status(201).json({
        success: true,
        message: ROLE_ASSIGN_SUCCESS_MESSAGE,
        data: "",
      });
    } catch (err) {
      next(err);
    }
  },
};
