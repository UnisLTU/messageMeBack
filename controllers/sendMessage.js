const createError = require("http-errors");
const { sendMessageDB } = require("../services/messagesServices");

//@description     Create message in chat
//@route           POST /api/message
//@access          Protected

const sendMessage = async (data, currentUser) => {
  if (!data.content || !data.chatId) {
    throw createError(400, "Invalid data passed into request");
  }

  const message = await sendMessageDB(data, currentUser);
  if (!message) {
    throw createError(500, "Message was not created");
  }
  return message;
};

module.exports = sendMessage;
