import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// Update Profile Route
userRouter
  .route("/update-profile")
  .post(trimRequest.all, protect, updateProfile);

export default userRouter;
