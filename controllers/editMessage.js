const createError = require("http-errors");
const { editMessageDB } = require("../services/messagesServices");

//@description     Edit message by id
//@route           PUT /api/messages/edit
//@access          Protected

const editMessage = async (messageId, content, currentUser) => {
  const message = await editMessageDB(messageId, content, currentUser);
  if (!message) {
    throw createError(400, "Message was not edited");
  }
  return message;
};

module.exports = editMessage;
