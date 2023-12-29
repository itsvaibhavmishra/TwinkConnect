import express from "express";

// routes imports
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import conversationRouter from "./conversationRouter.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/conversation", conversationRouter);

export default router;
