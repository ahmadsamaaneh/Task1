const repo = require("../repositories/user.repository");

exports.createUser = async (data) => repo.createUser(data);
exports.getAllUsers = async () => repo.getAllUsers();
exports.getUserById = async (id) => repo.getUserById(id);
exports.updateUser = async (id, data) => repo.updateUser(id, data);
exports.deleteUser = async (id) => repo.deleteUser(id);
