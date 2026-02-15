const User = require("../models/user.model");

exports.createUser = async (data) => User.create(data);
exports.getAllUsers = async () => User.find();
exports.getUserById = async (id) => User.findById(id);
exports.updateUser = async (id, data) => User.findByIdAndUpdate(id, data, { new: true });
exports.deleteUser = async (id) => User.findByIdAndDelete(id);
