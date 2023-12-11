import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/refreshToken").post(refreshToken);

export default authRouter;
