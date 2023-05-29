const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(422).json("you don't have sufficient permission")
    const users = await User.find({role: {$ne: "admin"}}, {password: 0, role: 0})
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(422).json("you don't have sufficient permission")
    const { id } = req.params;
    await User.deleteOne({_id: id})

    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};


module.exports = { getUsers, deleteUser };
