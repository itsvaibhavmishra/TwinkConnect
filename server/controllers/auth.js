import jwt from "jsonwebtoken";
import User from "../models/userModel";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_TOKEN);

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Email and Password are required",
    });
  }

  const authUser = await User.findOne({ email: email }).select("+password");

  // check if user is present in DB
  if (
    !authUser ||
    !(await authUser.correctPassword(password, authUser.password))
  ) {
    res.status(400).json({
      status: "error",
      message: "Incorrect Email or Password",
    });
  }

  const token = signToken(authUser._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};
