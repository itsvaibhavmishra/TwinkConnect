import http from "http";
import { app } from "./app.js";
import mongoose from "mongoose";
import { Server } from "socket.io"; // socket io
import User from "./models/userModel.js";

// exception handlers
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});

const port = process.env.PORT || 5000;

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("[DB] Connection Success");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = http.createServer(app);

// creating socket.io instence
const io = new Server(server, {
  cors: process.env.FRONT_ORIGIN,
  methods: ["GET", "POST"],
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});

// listen to socket connection
io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];

  const socket_id = socket.id;
  console.log(`User connected with ID: ${socket_id}`);

  if (user_id) {
    await User.findByIdAndUpdate(user_id, { socket_id });
  }

  // socket event listeners

  // friend request listener
  socket.on("friend_request", async (data) => {
    console.log(data.to); // returns users ID

    // send request "to" user based on their ID {User 1 => Sending Request User 2}
    // getting user
    const to = await User.findById(data.to);

    // emitting alert to User 2
    io.to(to.socket_id).emit("new_friend_request", {});
  });
});

// rejection handler
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down ...");
  server.close(() => {
    process.exit(1);
  });
});
