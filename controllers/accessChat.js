const createError = require("http-errors");
const { accessChatDB } = require("../services/chatServices");

//@description     Create chat or access it
//@route           POST /api/chat
//@access          Protected

const accessChat = async (userFromReq, currentUser) => {
  if (!userFromReq) {
    throw createError(400, "UserId param not sent with request");
  }

  const { chat, created } = await accessChatDB(userFromReq, currentUser);

  if (!chat) {
    throw createError(500, "Chat was not created");
  }
  return { chat, created };
};

module.exports = accessChat;
