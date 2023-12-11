import express from "express";

// routes imports
import authRouter from "./authRouter.js";

const router = express.Router();

router.use("/auth", authRouter);

export default router;
