const UserService = require("../services/user.service");

const getAll = async (_, res) => {
  try {
    const users = await UserService.getAll();

    return res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);

    if (user == null) {
      const error = new Error("User not found");
      error.code = 404;
      throw error;
    }

    return res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(error.code).json({
      error: error.message,
    });
  }
};

const postUser = async (req, res) => {
  try {
    const user = await UserService.create(req.body);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      errors: error.message,
    });
  }
};

module.exports = { postUser, getAll, getUserById };
