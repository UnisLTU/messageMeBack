const createError = require("http-errors");
const { createGroupChatDB } = require("../services/chatServices");

//@description     Getting all chats
//@route           POST /api/chat/creategroup
//@access          Protected

const createGroupChat = async (users, name, currentUser) => {
  const chat = await createGroupChatDB(users, name, currentUser);
  if (!chat) {
    throw createError(400, "Group was not created");
  }
  return chat;
};

module.exports = createGroupChat;
