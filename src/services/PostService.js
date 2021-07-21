const Post = require("../models/Post");
const { CustomError } = require("../helpers/error");

const registerPost = async ({ post, user_system_id }) => {
  try {
    const data = new Post({
      post,
      created_by: user_system_id,
    }).save();
    return data;
  } catch (err) {
    throw err;
  }
};

const getPost = async ({ start = 0, limit = 20 }) => {
  try {
    start = parseInt(start);
    limit = parseInt(limit);

    const pipeline = [
      {
        $project: {
          post: 1,
        },
      },
    ];
    return Promise.all([
      Post.aggregate(pipeline).count("count"),
      Post.aggregate(pipeline)
        .skip(start)
        .limit(limit),
    ]);
  } catch (err) {
    throw err;
  }
};

const updatePost = async ({ post_id, post, user_system_id }) => {
  try {
    const data = await Post.findByIdAndUpdate(
      post_id,
      { post, updated_by: user_system_id },
      { lean: true }
    );
    if (!data) throw new CustomError(400, "post not found!");
    return data;
  } catch (err) {
    throw err;
  }
};

const deletePost = async ({ post_id }) => {
  try {
    const data = await Post.findByIdAndRemove(post_id);
    if (!data) throw new CustomError(400, "post not found!");

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  registerPost,
  getPost,
  updatePost,
  deletePost,
};
