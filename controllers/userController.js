const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.update(req.params.id, req.body);
  if (!updatedUser) return res.status(404).json({ error: 'User not found' });
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  const success = await User.delete(req.params.id);
  if (!success) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
};
