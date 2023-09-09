import { Server } from "socket.io"; // socket io
import path from "path"; // from nodejs
import User from "./models/userModel.js";
import FriendRequest from "./models/requestModel.js";

export const initializeSocket = (server) => {
  // creating socket.io instence
  const io = new Server(server, {
    cors: process.env.FRONT_ORIGIN,
    methods: ["GET", "POST"],
  });

  // listen to socket connection
  io.on("connection", async (socket) => {
    const user_id = socket.handshake.query["user_id"];

    const socket_id = socket.id;
    console.log(`User connected with ID: ${socket_id}`);

    if (Boolean(user_id)) {
      // setting socket_id and setting status to Online
      await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
    }

    // socket event listeners
    // friend request listener
    socket.on("friend_request", async (data) => {
      // send request "to" user based on their ID {User 1 => Sending Request User 2}
      // getting user
      const to_user = await User.findById(data.to).select(
        "socket_id firstName"
      );
      const from_user = await User.findById(data.from).select(
        "socket_id firstName"
      );

      // creating a friend request
      await FriendRequest.create({
        sender: data.from,
        recipient: data.to,
      });

      // emitting alert to User 2 (request recieved)
      io.to(to_user.socket_id).emit("new_friend_request", {
        message: `New Friend Request from ${from_user.firstName}`,
      });

      // emitting alert to User 1 (request sent)
      io.to(from_user.socket_id).emit("request_sent", {
        message: `Request Sent to ${to_user.firstName}`,
      });
    });

    // accept request listener
    socket.on("accept_request", async (data) => {
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
      // io.to(sender.socket_id).emit("request_accepted", {
      //   message: "Friend Request Accepted",
      // });

      io.to(receiver.socket_id).emit("request_accepted", {
        message: "Friend Request Accepted",
      });
    });

    // reject request listener
    socket.on("reject_request", async (data) => {
      const request_doc = await FriendRequest.findById(data.request_id);

      // getting sender and receiver
      // const sender = await User.findById(request_doc.sender);
      const receiver = await User.findById(request_doc.recipient);

      // deleting friend request event after it is rejected
      await FriendRequest.findByIdAndDelete(data.request_id);

      // emitting message to the sender that the request was rejected
      // io.to(sender.socket_id).emit("request_rejected", {
      //   message: "Friend Request Rejected",
      // });

      // emitting message to the recipient that the request was rejected
      io.to(receiver.socket_id).emit("request_rejected", {
        message: "Friend Request Rejected",
      });
    });

    // remove friend listener
    socket.on("remove_friend", async (data) => {
      try {
        const user = await User.findById(data.user_id);

        // Check if the user exists
        if (!user) {
          // Handle the case where the user doesn't exist
          io.to(socket.id).emit("event_error", {
            message: "User not found",
          });
          return;
        }

        const friendToRemove = await User.findById(data.friend_id);

        // Check if the friend to remove exists
        if (!friendToRemove) {
          // Handle the case where the friend doesn't exist
          io.to(user.socket_id).emit("event_error", {
            message: "Friend not found",
          });
          return;
        }

        // Remove the friend from the user's friend list
        user.friends.pull(data.friend_id);
        await user.save();

        // Remove the user from the friend's friend list
        friendToRemove.friends.pull(data.user_id);
        await friendToRemove.save();

        // Emit a confirmation event to the user who initiated the removal
        io.to(user.socket_id).emit("friend_removed", {
          message: "Friend removed successfully",
        });
      } catch (error) {
        console.error("Error removing friend:", error);
        // Handle any errors that may occur during the process
        io.to(socket.id).emit("event_error", {
          message: "An error occurred while removing the friend",
        });
      }
    });

    // handling text/link messages
    socket.on("text_message", (data) => {
      // data will contain: {to, from, message}
      // add message to message list if it exists else create new conversation
      // save message to db
      // message sent User1 => User2
      // emit incoming_message to user2
      // emit outgoing_message from user1
    });

    // handling media messages
    socket.on("file_message", (data) => {
      // data will contain: {to, from, message, file}

      // getting file extension
      const fileExtension = path.extname(data.file.name);

      // generate a unique filename
      const fileName = `${Date.now()}_${Math.floor(
        Math.random() * 1000
      )}${fileExtension}`;

      // uploading file

      // add message to message list if it exists else create new conversation

      // save message to db

      // message sent User1 => User2
      // emit incoming_message to user2

      // emit outgoing_message from user1
    });

    socket.on("end", async (data) => {
      // find user with id and setting status to Offline
      if (data.user_id) {
        await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
      }
      // closing connection for this socket
      console.log("Closing connection");
      socket.disconnect(0);
    });
  });
};