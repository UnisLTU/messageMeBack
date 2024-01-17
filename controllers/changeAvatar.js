const createError = require("http-errors");
const { changeAvatarDB } = require("../services/userServices");

//@description     Change user Avatar by user id
//@route           PUT /api/user/changeavatar
//@access          Protected

const changeAvatar = async (_id, url) => {
  const user = await changeAvatarDB(_id, url);
  if (!user) {
    throw createError(400, "Message was not removed");
  }
  return user;
};

module.exports = changeAvatar;
