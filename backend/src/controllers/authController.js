import createHttpError from "http-errors";
import validator from "validator";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";
import { isDisposableEmail } from "../utils/checkDispose.js";
import { filterObj } from "../utils/filterObj.js";
import otp from "../Templates/Mail/otp.js";
import { transporter } from "../services/mailer.js";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

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

    // set user status to logged in
    const token = signToken(user._id);

    return res.status(200).json({
      status: "success",
      message: "OTP verified",
      token,
      user_id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
