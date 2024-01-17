const createError = require("http-errors");
const { allMessagesDB } = require("../services/messagesServices");

//@description     Create message in chat
//@route           GET /api/message/:chatID
//@access          Protected

const allMessages = async (chatId) => {
  if (!chatId) {
    throw createError(400, "No chat Id was provided");
  }

  const messages = await allMessagesDB(chatId);
  if (!messages) {
    throw createError(404, "Messages was not found");
  }
  return messages;
};

module.exports = allMessages;
