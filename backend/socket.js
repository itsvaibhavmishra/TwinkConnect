import { Server } from "socket.io"; // socket io

import { socketMiddleware } from "./src/middlewares/socketMiddleware.js";
import { emitFriendStatus } from "./src/controllers/friendsController.js";

export const initializeSocket = (server) => {
  // creating socket.io instence
  const io = new Server(server, {
    cors: process.env.FRONT_URL,
    methods: ["GET", "POST"],
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  // socket protect middleware
  io.use(socketMiddleware);

  // socket error middleware
  io.use((socket, next) => {
    socket.errorHandler = (error) => {
      // Emit an error event to the client
      socket.emit("error", { status: "error", message: error });
    };

    next();
  });

  // listen to socket connection
  io.on("connection", async (socket) => {
    const socket_id = socket.id;

    // ---------------Updating socket and user---------------
    const user = socket.user;
    const user_id = socket.user._id.toString();

    // join user with socket
    socket.join(user_id);

    // set user online
    user.onlineStatus = "online";
    await user.save();

    emitFriendStatus(io, socket, user, "online");

    // ------------------------------------------------------

    // ---------------User Disconnects---------------
    socket.on("disconnect", () => {
      user.onlineStatus = "offline";
      user.save();

      emitFriendStatus(io, socket, user, "offline");
    });
    // ------------------------------------------------------

    // ---------------Join Conversation Hanling---------------
    socket.on("join_conversation", (conversation_id) => {
      try {
        // join conversation id to socket
        socket.join(conversation_id);
      } catch (error) {
        socket.errorHandler("Socket: Error joining conversation");
      }
    });

    // ---------------Send Message Hanling---------------
    socket.on("send_message", (message) => {
      try {
        const conversation = message.conversation;

        if (!conversation.users) return;

        // emit message to each user(could be fr group)
        conversation.users.forEach((user) => {
          if (user._id !== message.sender._id) {
            socket.in(user._id).emit("message_received", message);
          }
        });
      } catch (error) {
        socket.errorHandler("Socket: Error sending message");
      }
    });

    // ---------------Typing Message Hanling---------------
    socket.on("start_typing", (conversation_id) => {
      try {
        socket.in(conversation_id).emit("start_typing", {
          typing: true,
          conversation_id: conversation_id,
        });
      } catch (error) {
        socket.errorHandler("Socket: Error with typing");
      }
    });
    socket.on("stop_typing", (conversation_id) => {
      try {
        socket.in(conversation_id).emit("stop_typing", {
          typing: false,
          conversation_id: conversation_id,
        });
      } catch (error) {
        socket.errorHandler("Socket: Error with typing");
      }
    });
  });
};
