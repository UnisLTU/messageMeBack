const createError = require("http-errors");

const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const fetchChatsDB = async (userId) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name pic email",
      },
    })
    .sort({ updatedAt: -1 });

  return chats;
};

const accessChatDB = async (userFromReq, currentUser) => {
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userFromReq } } },
      { users: { $elemMatch: { $eq: currentUser } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    return { chat: isChat[0], created: false };
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [currentUser, userFromReq],
    };

    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    return { chat: FullChat, created: false };
  }
};

const createGroupChatDB = async (users, name, currentUser) => {
  if (!users || !name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  let allUsers = JSON.parse(users);

  if (allUsers.length < 2)
    throw createError("More than 2 users are required to form a group chat");

  allUsers.push(currentUser);

  const groupChat = await Chat.create({
    chatName: name,
    users: allUsers,
    isGroupChat: true,
    groupAdmin: currentUser,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return fullGroupChat;
};

const removeFromGroupChatDB = async (userToRemove, chatId, currentUser) => {
  let chat = await Chat.findOne({ _id: chatId });

  if (currentUser._id.toString() === chat.groupAdmin._id.toString()) {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userToRemove },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return removed;
  }
};

const addToGroupChatDB = async (userToAdd, chatId, currentUser) => {
  let chat = await Chat.findOne({ _id: chatId });
  const userExists = chat.users.some(
    (user) => user._id.toString() === userToAdd
  );

  if (
    currentUser._id.toString() === chat.groupAdmin._id.toString() &&
    !userExists
  ) {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userToAdd },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return added;
  }
};

const renameGroupDB = async (chatName, currentChatId, userId) => {
  let chat = await Chat.findOne({ _id: currentChatId });

  if (chat.groupAdmin.toString() === userId._id.toString()) {
    const renamedChat = await Chat.findByIdAndUpdate(
      currentChatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return renamedChat;
  }
};

module.exports = {
  fetchChatsDB,
  accessChatDB,
  createGroupChatDB,
  removeFromGroupChatDB,
  addToGroupChatDB,
  renameGroupDB,
};
