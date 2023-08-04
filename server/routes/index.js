import express from "express";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
