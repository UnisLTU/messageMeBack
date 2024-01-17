const createError = require("http-errors");
const { removeFromGroupChatDB } = require("../services/chatServices");

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected

const removeFromGroupChat = async (userToRemove, chatId, currentUser) => {
  const chat = await removeFromGroupChatDB(userToRemove, chatId, currentUser);
  if (!chat) {
    throw createError(400, "User was not removed");
  }
  return chat;
};

module.exports = removeFromGroupChat;
