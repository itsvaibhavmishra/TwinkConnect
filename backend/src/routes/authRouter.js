import express from "express";
import trimRequest from "trim-request";
import {
  register,
  sendOtp,
  verifyOTP,
  refreshToken,
  login,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.route("/login").post(trimRequest.all, login);
authRouter.route("/logout").post(trimRequest.all, logout);
authRouter.route("/register").post(trimRequest.all, register, sendOtp);
authRouter.route("/send-otp").post(trimRequest.all, sendOtp);
authRouter.route("/verify-otp").post(trimRequest.all, verifyOTP);
authRouter.route("/refreshToken").post(trimRequest.all, refreshToken);
authRouter.route("/test").get(trimRequest.all, protect, (req, res) => {
  res.send(req.user);
});

export default authRouter;
