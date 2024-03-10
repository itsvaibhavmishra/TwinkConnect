import createHttpError from "http-errors";
import sizeOf from "image-size";
import validator from "validator";

import { UserModel } from "../models/index.js";
import { generateToken } from "./tokenService.js";

// Validate avatar with allowed format, size and dimension
export const validateAvatar = async (avatar) => {
  const allowedFormats = ["jpeg", "jpg", "png", "webp"];
  const maxFileSize = 3 * 1024 * 1024; // 3MB

  // Check format
  if (!allowedFormats.includes(avatar.mimetype.split("/")[1])) {
    throw createHttpError.BadRequest("Invalid image format");
  }

  // Check size
  if (avatar.size > maxFileSize) {
    throw createHttpError.BadRequest("Image size exceeds the limit");
  }

  // Check dimensions using image-size library
  const dimensions = sizeOf(avatar.buffer);

  if (dimensions.width !== dimensions.height) {
    throw createHttpError.BadRequest("Invalid image dimensions");
  }
};

// search users
export const searchForUsers = async (keyword, page, friends_ids) => {
  const pageSize = 10; // maximum users to display at once
  let users = [];
  let totalCount = 0;

  // Build the search criteria
  const searchCriteria = {};

  if (validator.isEmail(keyword)) {
    // If the keyword is an email address, search by email
    searchCriteria.email = keyword;
  } else {
    // If the keyword is not an email, search by combined firstName and lastName
    const combinedNameRegex = new RegExp(keyword, "i"); // 'i' for case-insensitive
    searchCriteria.$or = [
      { firstName: combinedNameRegex },
      { lastName: combinedNameRegex },
      {
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: combinedNameRegex,
          },
        },
      },
    ];
  }

  // Exclude friends of the current user
  searchCriteria._id = { $nin: friends_ids };

  // Perform the search
  users = await UserModel.find(searchCriteria)
    .select("_id firstName lastName email avatar activityStatus onlineStatus")
    .limit(pageSize)
    .skip(page * pageSize);

  // Get the total count for pagination
  totalCount = await UserModel.countDocuments(searchCriteria);

  return { users, totalCount };
};

// generate login tokens
export const generateLoginTokens = async (user, res) => {
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
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    sameSite: "None",
  });

  // store refresh token to cookies
  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/api/auth/refresh-token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "None",
  });

  return access_token;
};
