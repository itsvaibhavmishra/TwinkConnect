import createHttpError from "http-errors";
import { Server } from "socket.io"; // socket io

import { socketMiddleware } from "./src/middlewares/socketMiddleware.js";

export const initializeSocket = (server) => {
  // creating socket.io instence
  const io = new Server(server, {
    cors: process.env.FRONT_URL,
    methods: ["GET", "POST"],
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  // socket middleware
  io.use(socketMiddleware);

  // listen to socket connection
  io.on("connection", async (socket) => {
    const socket_id = socket.id;

    console.log(
      "------------------\n" +
        `${socket.user.firstName} ${socket.user.lastName} Connected` +
        "\n" +
        `SockedID: ${socket_id}` +
        "\n------------------"
    );

    socket.on("disconnect", () => {
      console.log(
        "------------------\n" +
          `${socket.user.firstName} ${socket.user.lastName} Disconnected` +
          "\n------------------"
      );
    });
  });
};
