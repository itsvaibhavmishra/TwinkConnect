import createHttpError from "http-errors";
import sizeOf from "image-size";

import { UserModel } from "../models/index.js";

// find a user based on userId
export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);

  if (!user)
    throw createHttpError.NotFound("Invalid User ID or User not found");

  return user;
};

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
