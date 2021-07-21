const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { CustomError } = require("../helpers/error");
const {LOGIN_SECRET, JWT_THRESHOLD} = require("../config");

const registerUser = async ({ userId, password }) => {
  try {
    const user_info = await User.findOne(
      { user_id: userId },
      { user_id: 1}
    ).lean();

    if (user_info) throw new CustomError(400, "userId already taken");

    const user = new User({
      user_id: userId,
      password: bcrypt.hashSync(password, 10), 
    }).save();

    return user;
  } catch (err) {
    throw err;
  }
};

const loginUser = async ({ userId, password }) => {
  try {
    const user_info = await User.findOne(
      { user_id: userId },
      { user_id: 1, password: 1 }
    ).lean();

    if (!user_info) throw new CustomError(400, "user does not exist");

    // verify password
    const isPassValid = bcrypt.compareSync(password, user_info.password);
    if (!isPassValid) throw new CustomError(400, "Invalid Password");

    //generate token
    const token = jwt.sign({ id: user_info._id, user_id:user_info.user_id }, LOGIN_SECRET, {
      expiresIn: JWT_THRESHOLD,
    });

    return {token, JWT_THRESHOLD}
  } catch (err) {
    throw err;
  }
}
module.exports = {
  loginUser,
  registerUser
};
