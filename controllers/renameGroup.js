const createError = require("http-errors");
const { rename, renameGroupDB } = require("../services/chatServices");

// @desc    Rename group
// @route   PUT /api/chat/renamegroup
// @access  Protected

const renameGroup = async (chatName, chatId, currentUser) => {
  const chat = await renameGroupDB(chatName, chatId, currentUser);
  if (!chat) {
    throw createError(400, "User was not removed");
  }
  return chat;
};

module.exports = renameGroup;
