import express from "express";
import trimRequest from "trim-request";
import multer from "multer";

import { protect } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// multer setup
const upload = multer();

// Update Profile Route
userRouter
  .route("/update-profile")
  .post(trimRequest.all, protect, upload.single("avatar"), updateProfile);

export default userRouter;
