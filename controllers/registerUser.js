const { createUserDB } = require("../services/userServices");
const createError = require("http-errors");

//@description     Create user
//@route           POST /api/register/
//@access          Unprotected
const registerUser = async (name, email, password) => {
  const user = await createUserDB(name, email, password);
  if (!user) {
    throw createError(500, "Can not create user");
  }
  return user;
};

module.exports = registerUser;
