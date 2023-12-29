import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import { createOpenConversation } from "../controllers/conversationController.js";

const conversationRouter = express.Router();

// Update Profile Route
conversationRouter
  .route("/")
  .post(trimRequest.all, protect, createOpenConversation);

export default conversationRouter;
