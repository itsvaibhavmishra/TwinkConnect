import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

// Send Message Route
messageRouter
  .route("/send-message")
  .post(trimRequest.all, protect, sendMessage);

// Get Message Route
messageRouter
  .route("/get-messages/:convo_id")
  .get(trimRequest.all, protect, getMessages);

export default messageRouter;
