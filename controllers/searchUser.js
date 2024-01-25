const createError = require("http-errors");
const { searchUserDB } = require("../services/userServices");

//@description     Search user
//@route           get /api/user/search=
//@access          Protected
const searchUser = async (key, userId) => {
  const users = await searchUserDB(key, userId);
  if (!users) {
    throw createError(404, "Cannot find user");
  }
  return users;
};

module.exports = searchUser;
