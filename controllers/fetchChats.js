const createError = require("http-errors");
const { fetchChatsDB } = require("../services/chatServices");

//@description     Getting all chats
//@route           GET /api/chat
//@access          Protected

const fetchChats = async (userId) => {
  const chats = await fetchChatsDB(userId);
  if (!chats) {
    throw createError(200, "Chats are empty");
  }
  return chats;
};

module.exports = fetchChats;
