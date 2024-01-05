import express from "express";

// router imports
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import conversationRouter from "./conversationRouter.js";
import messageRouter from "./messageRouter.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/conversation", conversationRouter);

router.use("/message", messageRouter);

export default router;
