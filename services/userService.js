const User = require('../models/userModel');

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.updateUser = async (id, data) => {
  await User.update(data, { where: { id } });
  return await User.findByPk(id);
};

exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};
