import createHttpError from "http-errors";
import validator from "validator";

import { UserModel } from "../models/index.js";
import { filterObj } from "../utils/filterObj.js";

// -------------------------- Update Profile --------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, avatar, activityStatus } = req.body;

    // check for empty fields
    if (!userId || !firstName || !lastName || !activityStatus) {
      throw createHttpError.BadRequest(
        "Required fields: userId, firstName, lastName, activityStatus"
      );
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw createHttpError.NotFound("Invalid User");
    }

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

    // Activity Status validation
    if (!validator.isLength(activityStatus, { min: 3, max: 50 })) {
      throw createHttpError.BadRequest(
        "Activity Status must be between 3-50 characters long"
      );
    }

    return res.status(200).json({
      status: "success",
      message: "Returned from backend 😀",
      user: {
        firstName: user,
        firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
