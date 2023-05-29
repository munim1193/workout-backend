const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");

const sendVerifyMail = async (info, email) => {
  const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: "1d" });
  const options = {
    from: {name: "Naeem Gym", address: process.env.EMAIL_ADDRESS},
    subject: "Verification",
    html: `
      <h1>Welcome to naeem Gym</h1>
      <p>Click here to verify your account <a href="${process.env.FRONT_END_HOST}?purpose=verification&token=${token}">TU</a></p>
      `,
  };

  return await sendMail(options, email);
};

const sendResetMail = async (info, email) => {
  const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: "1d" });
  const options = {
    from: {name: "Naeem Gym", address: process.env.EMAIL_ADDRESS},
    subject: "Password Reset",
    html: `
      <h1>Password Reset</h1>
      <p>
        Click here to reset your password<a href="${process.env.FRONT_END_HOST}/change-password?token=${token}">RESET PASSWORD</a>
      </p>
      `,
  };
  return await sendMail(options, email);
};

const create = async (req, res, next) => {
  try {
    const userObj = req.body;
    userObj.verified = false;

    const newUser = new User(userObj);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    newUser.password = hashPassword;
    await newUser.save();

    const info = { id: newUser._id };
    // await sendVerifyMail(info, newUser.email);
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { identity, password } = req.body;
    let user;
    user = await User.findOne({ username: identity });
    if (!user) user = await User.findOne({ email: identity });
    if (!user)
      return res
        .status(400)
        .json({ messages: "Email/Username can't ffound" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ messages: "Invalid Password" });
/*
    if (!user.verified)
      return res.status(400).json({
        messages: "Account is not verified",
        reason: "not verified",
      });
      */

    const info = {
      email: user.email,
      username: user.username,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.status(200).json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

const resendVerificaton = async (req, res, next) => {
  try {
    const { identity } = req.body;
    let user = await User.findOne({ username: identity });
    if (!user) {
      user = await User.findOne({ email: identity });
    }
    if (!user)
      return res.status(404).json({
        messages: "User not found",
      });

    await sendVerifyMail({ id: user._id }, user.email);
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { identity } = req.body;
    let user = await User.findOne({ username: identity });
    if (!user) {
      user = await User.findOne({ email: identity });
    }
    if (!user)
      return res.status(404).json({
        messages: "User not found",
      });

    await sendResetMail(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      user.email
    );
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.id) {
    return res.status(403).json({ error: "Invalid token" });
  }

  try {
    const user = await User.findOne({ _id: decoded.id });
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found" });

    user.verified = true;
    await user.save();
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
  resendVerificaton,
  resetPassword,
  verify,
  changePassword,
};
