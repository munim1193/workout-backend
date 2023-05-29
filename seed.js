const User = require("./models/User");
const bcrypt = require("bcrypt")

const init = async () => {
  const user = await User.findOne({role: "admin"})
  if (user) return;

  const {
    ADMIN_USERNAME: username,
    ADMIN_TELEPHONE: telephone,
    ADMIN_EMAIL: email,
    ADMIN_FNAME: fname,
    ADMIN_LNAME: lname,
    ADMIN_GENDER: gender,
    ADMIN_PASSWORD
  } = process.env;

    const salt = await bcrypt.genSalt(10);
    const password =  await bcrypt.hash(ADMIN_PASSWORD, salt);

  return User.create({
    username,
    email,
    lname,
    fname,
    telephone,
    gender,
    password,
    role: "admin",
  });
};

module.exports = init;
