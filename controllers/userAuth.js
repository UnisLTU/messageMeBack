const {
  createUserDB,
  loginWithCredentials,
} = require("../services/userServices");

//@description     Login with credentials
//@route           POST /api/user/login
//@access          Protected
const authUser = async (email, password) => {
  const user = await loginWithCredentials(email, password);
  if (!user) {
    throw createError(500, "Can not login");
  }
  return user;
};

module.exports = { authUser };
