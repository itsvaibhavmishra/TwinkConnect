import createHttpError from "http-errors";
import validator from "validator";
import otpGenerator from "otp-generator";

import { UserModel } from "../models/index.js";
import { isDisposableEmail } from "../utils/checkDispose.js";
import { filterObj } from "../utils/filterObj.js";
import otp from "../Templates/Mail/otp.js";
import { transporter } from "../services/mailer.js";
import { generateToken, verifyToken } from "../services/tokenService.js";
import { findUser } from "../services/userService.js";

// -------------------------- Login auth --------------------------
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check for empty fields
    if (!email || !password) {
      throw createHttpError.BadRequest("Required fields: email & password");
    }

    const user = await UserModel.findOne({ email: email }).select("+password");

    // check for user and password
    if (!user || !user.password) {
      throw createHttpError.NotFound("Incorrect Email or Password");
    }

    // check if user is present in DB and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw createHttpError.NotFound("Incorrect Email or Password");
    }

    // check if user is verified
    if (!user.verified) {
      res.status(200).json({
        status: "info",
        message: `Hello ${user.firstName}, please verify to login`,
      });
      return;
    }

    // generating user token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.JWT_ACCESS_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.JWT_REFRESH_SECRET
    );

    // store access token to cookies
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    // store refresh token to cookies
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      access_token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Logout auth --------------------------
export const logout = async (req, res, next) => {
  try {
    // clear refreshToken
    res.clearCookie("accessToken");

    // clear refreshToken
    res.clearCookie("refreshToken", { path: "/api/auth/refreshToken" });
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Register auth --------------------------
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check for empty fields
    if (!firstName || !lastName || !email || !password) {
      throw createHttpError.BadRequest(
        "Required fields: firstName, lastName, email & password"
      );
    }

    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "password"
    ); // filter request according to allowed fields

    // Name validation
    if (
      !validator.isLength(firstName, { min: 3, max: 16 }) ||
      !validator.isLength(lastName, { min: 3, max: 16 })
    ) {
      throw createHttpError.BadRequest(
        "First and Last Name each must be between 3-16 characters long"
      );
    }

    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      throw createHttpError.BadRequest(
        "First Name and Last Name can only contain alphabetic characters"
      );
    }

    // Email validation
    if (!validator.isEmail(email)) {
      throw createHttpError.BadRequest("Invalid Email");
    }

    // Check if email is disposable
    const isDisposable = await isDisposableEmail(email);

    if (isDisposable) {
      throw createHttpError.BadRequest("Disposable emails are not allowed");
    }

    // Password Validation
    if (!validator.isStrongPassword(password)) {
      throw createHttpError.BadRequest(
        "Password must be 8 characters long, contain atleast one number, lowercase, uppercase letters and a symbol"
      );
    }

    // Adding User
    // check if email exists and is verified in db
    const existing_user = await UserModel.findOne({ email: email });

    // check of verified users
    if (existing_user && existing_user.verified) {
      throw createHttpError.Conflict("Email is already registered");
    }
    // check of non verified users
    else if (existing_user) {
      // Update user instance with filteredBody and save to trigger pre-save hook
      existing_user.set(filteredBody);
      await existing_user.save();

      req.userId = existing_user._id;
      next();
    }

    // check for non registered users
    else {
      const new_user = await UserModel.create(filteredBody);

      // generating otp and email verification
      req.userId = new_user.id;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// -------------------------- Sending OTP --------------------------
export const sendOtp = async (req, res, next) => {
  try {
    const { userId } = req;
    const { email } = req.body;

    // getting user via email or userId
    const user =
      (await UserModel.findOne({ email: email })) ||
      (await UserModel.findById(userId));

    if (!user) {
      throw createHttpError.NotFound("User not found, Please register");
    } else if (user.verified) {
      throw createHttpError.Conflict("User already verified, Please log in");
    }

    // Generating new OTP
    const new_otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // OTP expiry
    const otp_expiry_time = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

    // Updating OTP and expiry time
    user.otp = new_otp;
    user.otp_expiry_time = otp_expiry_time;

    await user.save();

    // Sending email
    const emailDetails = {
      from: `TwinkChat <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "TwinkChat - Here's your OTP",
      html: otp(user.firstName, new_otp),
    };

    try {
      await transporter.sendMail(emailDetails);
      return res.status(200).json({
        status: "success",
        message: "OTP Sent",
      });
    } catch (error) {
      throw createHttpError.InternalServerError(`Failed to send OTP: ${error}`);
    }
  } catch (error) {
    next(error);
  }
};

// -------------------------- Verifying OTP --------------------------
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({
      email,
      otp_expiry_time: { $gt: Date.now() },
    });

    // error handling for OTP
    if (!user) {
      throw createHttpError.BadRequest("OTP Expired or Invalid Email");
    }

    // if user is already verified
    if (user.verified) {
      throw createHttpError.Conflict("Email is already verified");
    }

    // method defined on userModel | Invalid OTP
    if (!(await user.correctOTP(otp, user.otp))) {
      throw createHttpError.Unauthorized("Incorrect OTP");
    }

    //  updating verified status
    user.verified = true;
    user.otp = undefined;

    await user.save({ new: true, validateModifiedOnly: true });

    // generating user token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.JWT_ACCESS_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.JWT_REFRESH_SECRET
    );

    // store access token to cookies
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    // store refresh token to cookies
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // grant access to login
    return res.status(200).json({
      status: "success",
      message: "OTP verified",
      access_token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) throw createHttpError.Unauthorized("Please login");

    const check = await verifyToken(
      refresh_token,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await findUser(check.userId);

    // generating user token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.JWT_ACCESS_SECRET
    );

    return res.status(200).json({
      status: "success",
      message: "Token Refreshed",
      access_token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
