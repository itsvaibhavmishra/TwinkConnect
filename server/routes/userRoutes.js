import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getFriends,
  getRequests,
  getUsers,
  upadteProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

// fetching all verified users
userRouter.get("/get_users", protect, getUsers);

// fetching all friends list
userRouter.get("/get_friends", protect, getFriends);

// fetching all friend requests
userRouter.get("/get_requests", protect, getRequests);

// update user profile Route
userRouter.patch("/update-profile", protect, upadteProfile);

export default userRouter;
