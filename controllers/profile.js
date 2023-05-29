const UserModel = require("../models/User");

const getProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const projection = { password: 0, verified: 0, verifyToken: 0, __v: 0 };
    const profile = await UserModel.findById(userId, projection).lean();
    return res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile };
