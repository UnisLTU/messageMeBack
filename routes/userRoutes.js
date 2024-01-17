const express = require("express");
const { authUser } = require("../controllers/userAuth");
const registerUser = require("../controllers/registerUser");
const searchUser = require("../controllers/searchUser");

const { protect } = require("../middleware/authMiddleware");
const changeAvatar = require("../controllers/changeAvatar");

//initiate express Router
const router = express.Router();

// post user to route /api/user/register
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await registerUser(name, email, password);
    res.status(200).json({ message: "OK", success: true });
  } catch (error) {
    next(error);
  }
});

// post login data to route /api/user/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await authUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//get all user by search query

router.get("/", protect, async (req, res, next) => {
  const key = req.query.search;
  const userId = req.user._id;
  try {
    const data = await searchUser(key, userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//put Change user Avatar by user id

router.put("/changeavatar", protect, async (req, res, next) => {
  const url = req.body.data.url;
  const _id = req.user._id;
  console.log(_id);
  try {
    const data = await changeAvatar(_id, url);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
