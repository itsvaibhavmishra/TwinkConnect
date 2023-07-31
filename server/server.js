import http from "http";
import { app } from "./app.js";
import mongoose from "mongoose";

// exception handlers
process.on("uncaughtException", (err) => {
  console.log(err);
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

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});

// rejection handler
process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
