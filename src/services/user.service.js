const User = require("../database/users");

const getAll = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const user = await User.findOne(id);

    return user;
  } catch (error) {
    throw error;
  }
};

const create = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll, getById, create };
