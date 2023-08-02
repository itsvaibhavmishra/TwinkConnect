import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/userModel";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_TOKEN);

// Function to check if the email is disposable using Debounce API
const isDisposableEmail = async (email) => {
  try {
    const response = await axios.get(
      `https://disposable.debounce.io/?email=${email}`
    );
    return response.data.disposable;
  } catch (error) {
    console.error("Error while checking disposable email:", error);
    return false;
  }
};

// login auth
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

// register auth
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if email is disposable
  const isDisposable = await isDisposableEmail(email);

  if (isDisposable) {
    return res.status(400).json({
      status: "error",
      message: "Disposable email addresses are not allowed.",
    });
  }

  // check if email exists and is verified in db
  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  }
};
