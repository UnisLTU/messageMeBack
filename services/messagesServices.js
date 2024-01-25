const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const createError = require("http-errors");

const sendMessageDB = async (data, currentUser) => {
  const { content, chatId } = data;

  let newMessage = {
    sender: currentUser,
    content: content,
    chat: chatId,
    isDeleted: false,
  };

  let message = await Message.create(newMessage);

  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  return message;
};

const allMessagesDB = async (chatId) => {
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");
  return messages;
};

const removeMessageDB = async (_id, currentUser) => {
  let message = await Message.findById(_id);
  if (!message) throw createError(404, "Message was not found");
  if (message.sender._id.toString() !== currentUser._id.toString())
    throw createError(401, "Not authorized to remove this message");

  const removedMessage = await Message.findByIdAndUpdate(
    _id,
    {
      content: "",
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return removedMessage;
};

const editMessageDB = async (_id, content, currentUser) => {
  let message = await Message.findById(_id);
  if (!message) throw createError(404, "Message was not found");
  if (message.sender._id.toString() !== currentUser._id.toString()) {
    throw createError(401, "Not authorized to edit this message");
  }

  const editedMessage = await Message.findByIdAndUpdate(
    _id,
    {
      content: content,
    },
    {
      new: true,
    }
  );

  return editedMessage;
};

module.exports = {
  sendMessageDB,
  allMessagesDB,
  removeMessageDB,
  editMessageDB,
};
