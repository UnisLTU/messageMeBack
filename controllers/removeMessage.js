const createError = require("http-errors");
const { removeMessageDB } = require("../services/messagesServices");

//@description     Remove message by id
//@route           PUT /api/messages/remove
//@access          Protected

const removeMessage = async (messageId, currentUser) => {
  const message = await removeMessageDB(messageId, currentUser);
  if (!message) {
    throw createError(400, "Message was not removed");
  }
  return message;
};

module.exports = removeMessage;
