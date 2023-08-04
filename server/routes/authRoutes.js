import express from "express";
import {
  login as loginAuth,
  register as registerAuth,
  forgotPassword as fPasswordAuth,
  resetPassword as rPasswordAuth,
  sendOtp as sendOtpAuth,
  verifyOTP as verifyOtpAuth,
} from "../controllers/authController.js";

const authRouter = express.Router();

// Login Route
authRouter.post("/login", loginAuth);

// Register Route
authRouter.post("/register", registerAuth);

// Forgot Password Route
authRouter.post("/forgot-password", fPasswordAuth);

// Reset Password Route
authRouter.post("/reset-password", rPasswordAuth);

// Send OTP Route
authRouter.post("/send-otp", sendOtpAuth);

// Verify OTP Route
authRouter.post("/verify-otp", verifyOtpAuth);

export default authRouter;
