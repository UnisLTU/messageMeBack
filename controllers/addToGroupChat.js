const createError = require("http-errors");
const { addToGroupChatDB } = require("../services/chatServices");

// @desc    Add user to Group
// @route   PUT /api/chat/addtogroup
// @access  Protected

const addToGroupChat = async (userToAdd, chatId, currentUser) => {
  const chat = await addToGroupChatDB(userToAdd, chatId, currentUser);
  if (!chat) {
    throw createError(400, "User was not added");
  }
  return chat;
};

module.exports = addToGroupChat;
