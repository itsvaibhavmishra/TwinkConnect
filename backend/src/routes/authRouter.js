import express from "express";
import trimRequest from "trim-request";
import {
  register,
  sendOtp,
  verifyOTP,
  refreshToken,
  login,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/login").post(trimRequest.all, login);
authRouter.route("/register").post(trimRequest.all, register, sendOtp);
authRouter.route("/send-otp").post(trimRequest.all, sendOtp);
authRouter.route("/verify-otp").post(trimRequest.all, verifyOTP);
authRouter.route("/refreshToken").post(trimRequest.all, refreshToken);

export default authRouter;
