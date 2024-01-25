const { routeNotFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messagesRoutes);
//handle request error
app.use(errorHandler);
//handle bad route error
app.use(routeNotFound);

// Socket.IO

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("newMessage", (message) => {
    console.log(
      `User sent message "${message.data.content}" with id ${message.data._id} to ${message.data.chat._id}`
    );
    socket.to(message.data.chat._id).emit("messageReceived", message.data);
  });

  socket.on("deleteMessage", (message) => {
    socket.to(message.data.chat).emit("messageDeleted", message.data);
  });

  socket.on("editMessage", (message) => {
    socket.to(message.data.chat).emit("messageEdited", message.data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
