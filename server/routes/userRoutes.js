import express from "express";
import { protect } from "../controllers/authController.js";
import { upadteProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// Login Route
userRouter.post("/update-profile", protect, upadteProfile);

export default userRouter;
