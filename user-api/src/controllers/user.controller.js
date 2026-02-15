
const service = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
};
