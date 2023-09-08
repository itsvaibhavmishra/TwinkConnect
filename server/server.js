import http from "http";
import { app } from "./app.js";
import mongoose from "mongoose";
import { Server } from "socket.io"; // socket io
import User from "./models/userModel.js";
import FriendRequest from "./models/requestModel.js";

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

  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id });
  }

  // socket event listeners

  // friend request listener
  socket.on("friend_request", async (data) => {
    console.log(data.to); // returns users ID

    // send request "to" user based on their ID {User 1 => Sending Request User 2}
    // getting user
    const to_user = await User.findById(data.to).select("socket_id");
    const from_user = await User.findById(data.from).select("socket_id");

    // creating a friend request
    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    // emitting alert to User 2 (request recieved)
    io.to(to_user.socket_id).emit("new_friend_request", {
      message: "New Friend Request",
    });

    // emitting alert to User 1 (request sent)
    io.to(from_user.socket_id).emit("request_sent", {
      message: "Request Sent",
    });
  });

  // accept request listener
  socket.on("accept_request", async (data) => {
    console.log(data);

    const request_doc = await FriendRequest.findById(data.request_id);

    // getting sender and receiver
    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    // deleting friend request event after it is accepted
    await FriendRequest.findByIdAndDelete(data.request_id);

    // emitting message to users after accepting request
    io.to(sender.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  socket.on("end", function () {
    // closing connection for this socket
    console.log("Closing connection");
    socket.disconnect(0);
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
