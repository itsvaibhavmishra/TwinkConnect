import http from "http";
import { app } from "./app.js";
import mongoose from "mongoose";
import { initializeSocket } from "./socket.js";

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

// Initialize Socket.io
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});

// rejection handler
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down ...");
  server.close(() => {
    process.exit(1);
  });
});
