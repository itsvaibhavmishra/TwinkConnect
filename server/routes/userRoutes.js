import express from "express";
import { protect } from "../controllers/authController.js";
import { getUsers, upadteProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// fetching all verified users
userRouter.post("/get_users", protect, getUsers);

// update user profile Route
userRouter.patch("/update-profile", protect, upadteProfile);

export default userRouter;
