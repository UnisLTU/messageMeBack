const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const sendMessage = require("../controllers/sendMessage");
const allMessages = require("../controllers/allMessages");
const removeMessage = require("../controllers/removeMessage");
const editMessage = require("../controllers/editMessage");

const router = express.Router();

// post new message to chat with chatId
router.post("/", protect, async (req, res, next) => {
  data = req.body;
  currentUser = req.user._id;
  try {
    const message = await sendMessage(data, currentUser);
    if (message) res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

router.get("/:chatId", protect, async (req, res, next) => {
  chatId = req.params.chatId;
  try {
    const messages = await allMessages(chatId);
    if (messages) {
      res.status(200).json(messages);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/remove", protect, async (req, res, next) => {
  const { _id } = req.body;
  const currentUser = req.user;
  try {
    const message = await removeMessage(_id, currentUser);
    if (message) {
      res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/edit", protect, async (req, res, next) => {
  const { _id, content } = req.body;
  const currentUser = req.user;

  try {
    const message = await editMessage(_id, content, currentUser);
    if (message) {
      console.log("Message with id: " + _id + " was edited");
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
