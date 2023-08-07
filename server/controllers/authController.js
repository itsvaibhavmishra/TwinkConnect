import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { isDisposableEmail } from "../utils/checkDispose.js";
import { filterObj } from "../utils/filterObj.js";
import otpGenerator from "otp-generator";
import crypto from "crypto";
import { transporter } from "../services/mailer.js";
import otp from "../Templates/Mail/otp.js";
import { promisify } from "util";
import AppError from "../utils/AppError.js";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_TOKEN);

// -------------------------- Login auth --------------------------
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Email and Password are required",
    });
    return;
  }

  const authUser = await User.findOne({ email: email }).select("+password");

  // check for user and password
  if (!authUser || !authUser.password) {
    res.status(400).json({
      status: "error",
      message: "Incorrect Email or Password",
    });

    return;
  }

  // check if user is present in DB
  if (
    !authUser ||
    !(await authUser.correctPassword(password, authUser.password))
  ) {
    res.status(400).json({
      status: "error",
      message: "Incorrect Email or Password",
    });
    return;
  }

  const token = signToken(authUser._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};

// -------------------------- Register auth --------------------------
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  ); // filter request according to allowed fields

  // Check if email is disposable
  const isDisposable = await isDisposableEmail(email);

  if (isDisposable) {
    return res.status(400).json({
      status: "error",
      message: "Disposable emails are not allowed.",
    });
  }

  // check if email exists and is verified in db
  const existing_user = await User.findOne({ email: email });

  // check of verified users
  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  }
  // check of non verified users
  else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      runValidators: true,
    });
    req.userId = existing_user._id;
    next();
  }

  // check for non registered users
  else {
    const new_user = await User.create(filteredBody);

    // generating otp and email verification
    req.userId = new_user.id;
    next();
  }
};

// -------------------------- Sending OTP --------------------------
export const sendOtp = async (req, res, next) => {
  const { userId } = req;

  // generating new otp
  const new_otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  // otp expiry
  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // expired in 10mins

  // updating otp and expiry time
  const user = await User.findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time,
  });

  user.otp = new_otp.toString();

  await user.save({ new: true, validateModifiedOnly: true });

  // sending email
  const emailDetails = {
    from: `TwinkChat <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "TwinkChat - Here's your OTP",
    html: otp(user.firstName, new_otp),
  };

  await transporter
    .sendMail(emailDetails)
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "OTP Sent",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: `Failed to send OTP: ${error}`,
      });
    });
};

// Verifying OTP and updating verified status
export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  // error handling for OTP
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "OTP Expired or Invalid Email",
    });
  }

  // if user is already verified
  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "Email is already verified",
    });
  }

  // method defined on userModel | Invalid OTP
  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "Incorrect OTP",
    });
    return;
  }

  //  updating verified status
  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  // set user status to logged in
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified",
    token,
  });
};

// -------------------------- Protected route --------------------------
export const protect = async (req, res, next) => {
  let token;

  // getting token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.header.authorization.split(" ")[1];
  }
  // getting token from cookies
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // token not found
  if (!token) {
    return next(new AppError(`Please Login First`, 401));
  }

  // verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check for existing user with same token
  const this_user = await User.findById(decoded.id);

  if (!this_user) {
    return next(new AppError("Unidentified User", 401));
  }

  // check if user changed password after new token was created
  if (this_user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password updated, logging out! Please login again", 401)
    );
  }

  req.user = this_user;
  next();
};

// -------------------------- Forgot password --------------------------
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Email is not registered",
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${process.env.FRONT_ORIGIN}/auth/reset-password/?code=${resetToken}`;

    // send mail for verification
    res.status(200).json({
      status: "success",
      message: "Reset Password link sent",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // turn validator off for passing undefined values
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending Reset Password link"), 500);
  }
};

// -------------------------- Reset password --------------------------
export const resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "OTP Expired or Invalid Token",
    });
  }

  // updating user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reset Successfully",
    token,
  });
};
