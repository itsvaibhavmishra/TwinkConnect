import express from "express";

// routes imports
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

export default router;
