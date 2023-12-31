import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import {
  createOpenConversation,
  getConversations,
} from "../controllers/conversationController.js";

const conversationRouter = express.Router();

// Create New Conversation Route
conversationRouter
  .route("/create-open-conversation")
  .post(trimRequest.all, protect, createOpenConversation);

conversationRouter
  .route("/get-conversations")
  .get(trimRequest.all, protect, getConversations);

export default conversationRouter;
