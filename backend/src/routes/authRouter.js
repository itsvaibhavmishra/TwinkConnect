import express from "express";
import trimRequest from "trim-request";
import {
  register,
  sendOtp,
  verifyOTP,
  refreshToken,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  githubAuth,
  googleAuth,
  linkedinAuth,
} from "../controllers/socialController.js";

const authRouter = express.Router();

// Login Route
authRouter.route("/login").post(trimRequest.all, login);

// Logout Route
authRouter.route("/logout").post(trimRequest.all, logout);

// Register Route
authRouter.route("/register").post(trimRequest.all, register, sendOtp);

// Send OTP Route
authRouter.route("/send-otp").post(trimRequest.all, sendOtp);

// Verify OTP Route
authRouter.route("/verify-otp").post(trimRequest.all, verifyOTP);

// Forgot Password Route
authRouter.route("/forgot-password").post(trimRequest.all, forgotPassword);

// Reset Password Route
authRouter.route("/reset-password").post(trimRequest.all, resetPassword);

// Refresh Token Route
authRouter.route("/refresh-token").post(trimRequest.all, refreshToken);

// ------------- Social Auth -------------

// Google Auth Route
authRouter.route("/google").post(googleAuth);

// GitHub Auth Route
authRouter.route("/github").post(githubAuth);

// LinkedIn Auth Route
authRouter.route("/linkedin").post(linkedinAuth);

export default authRouter;
