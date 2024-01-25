const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const createError = require("http-errors");

const createUserDB = async (name, email, password) => {
  // check if all fields provided
  if (!name || !email || !password) {
    throw createError(400, "Please enter all of the fields");
  }
  // check if user with this email already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw createError(400, "User with this email already exists");
  }

  //create user in DB
  let user = await User.create({
    name,
    email,
    password,
  });

  //if user created in DB assign values
  if (user) {
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
      success: true,
    };
  }
  return user;
};

const loginWithCredentials = async (email, password) => {
  // check if all fields provided
  if (!email || !password) {
    throw createError(400, "Please enter all of the fields");
  }
  // check if user with this email already exist
  let user = await User.findOne({ email });

  //if user exists and password matches assign values to user
  if (user && (await user.matchPassword(password))) {
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      success: true,
    };
  } else {
    throw createError(400, "Invalid Email or Password");
  }

  return user;
};

const searchUserDB = async (key, userId) => {
  const query = key
    ? {
        $or: [
          { name: { $regex: key, $options: "i" } },
          { email: { $regex: key, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(query)
    .find({ _id: { $ne: userId } })
    .select("-password");

  return users;
};

const changeAvatarDB = async (_id, url) => {
  let user = await User.findById(_id);
  if (user._id.toString() !== _id.toString())
    throw createError(401, "User not authorized to change avatar");

  let editedUser = await User.findByIdAndUpdate(
    _id,
    {
      pic: url,
    },
    {
      new: true,
    }
  );

  user = {
    _id: editedUser._id,
    name: editedUser.name,
    email: editedUser.email,
    isAdmin: editedUser.isAdmin,
    pic: editedUser.pic,
    token: generateToken(editedUser._id),
    success: true,
  };

  return user;
};

module.exports = {
  createUserDB,
  loginWithCredentials,
  searchUserDB,
  changeAvatarDB,
};
