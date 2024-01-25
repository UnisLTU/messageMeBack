const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const fetchChats = require("../controllers/fetchChats");
const accessChat = require("../controllers/accessChat");
const createGroupChat = require("../controllers/createGroupChat");
const removeFromGroupChat = require("../controllers/removeFromGroup");
const addToGroupChat = require("../controllers/addToGroupChat");
const renameGroup = require("../controllers/renameGroup");

const router = express.Router();

router.get("/", protect, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const chats = await fetchChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
});

// post new chat to route /api/chat or access
router.post("/", protect, async (req, res, next) => {
  const userFromReq = req.body.userId;
  const currentUser = req.user._id;
  try {
    const { chat, created } = await accessChat(userFromReq, currentUser);

    if (created) {
      console.log("New chat created with id", chat._id);
    } else {
      console.log("Existing chat accessed with id:", chat._id);
    }
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.post("/creategroup", protect, async (req, res, next) => {
  const users = req.body.users;
  const name = req.body.name;
  const currentUser = req.user;

  try {
    const chat = await createGroupChat(users, name, currentUser);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.put("/groupremove", protect, async (req, res, next) => {
  const userToRemove = req.body.user;
  const chatId = req.body.chatId;
  const currentUser = req.user;

  try {
    const chat = await removeFromGroupChat(userToRemove, chatId, currentUser);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.put("/addtogroup", protect, async (req, res, next) => {
  const userToAdd = req.body.user;
  const chatId = req.body.chatId;
  const currentUser = req.user;

  try {
    const chat = await addToGroupChat(userToAdd, chatId, currentUser);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.put("/renamegroup", protect, async (req, res, next) => {
  const chatName = req.body.chatName;
  const chatId = req.body.chatId;
  const currentUser = req.user;

  try {
    const chat = await renameGroup(chatName, chatId, currentUser);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
