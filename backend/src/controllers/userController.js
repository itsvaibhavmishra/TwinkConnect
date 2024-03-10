import createHttpError from "http-errors";
import validator from "validator";

import { deleteFile, uploadFiles } from "../services/fileUploadService.js";
import { searchForUsers, validateAvatar } from "../services/userService.js";
import { UserModel } from "../models/index.js";

// -------------------------- Update Profile --------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, activityStatus } = req.body;
    const avatar = req.file;
    const user = req.user;

    // check for empty fields
    if (!firstName || !lastName || !activityStatus) {
      throw createHttpError.BadRequest(
        "Required fields: firstName, lastName, activityStatus"
      );
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

    // url for avatar will be stored here
    let fileUrls = [];

    if (avatar) {
      // validate avatar
      validateAvatar(avatar);

      // set main folder for cloudinary
      const mainFolder = "User Avatars";

      // delete existing avatar
      if (user.avatar) {
        const fileName = user.avatar.split("/").pop().split(".")[0];

        await deleteFile(mainFolder, `${firstName} ${user._id}`, fileName);
      }

      // Upload files to Cloudinary
      const uploadResult = await uploadFiles(
        mainFolder,
        avatar,
        `${firstName} ${user._id}`
      );

      fileUrls = uploadResult.fileUrls;
    } else {
      // set main folder for cloudinary
      const mainFolder = "User Avatars";

      // delete existing avatar
      if (user.avatar) {
        const fileName = user.avatar.split("/").pop().split(".")[0];

        await deleteFile(mainFolder, `${firstName} ${user._id}`, fileName);
      }
    }

    // updating user
    user.set({
      firstName: firstName,
      lastName: lastName,
      avatar: avatar ? fileUrls[0] : "",
      activityStatus: activityStatus,
    });

    user.save();

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        activityStatus: user.activityStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Search Users --------------------------
export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    const page = req.query.page || "0";

    const currentUser_id = req.user?._id;
    const friends_ids = req.user?.friends;

    // check for required fields
    if (!keyword) {
      throw createHttpError.BadRequest("Query required");
    }

    // get list of users matching keyword
    const { users, totalCount } = await searchForUsers(
      keyword,
      page,
      friends_ids,
      currentUser_id
    );

    res.status(200).json({
      status: "success",
      usersFound: totalCount,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Get User Data --------------------------
export const getUserData = async (req, res, next) => {
  try {
    const id = req.query.userId;

    // check for required fields
    if (!id) {
      throw createHttpError.BadRequest("Query required");
    }

    const userData = await UserModel.findById(id).select(
      "-password -passwordChangedAt -verified -onlineStatus -friends"
    );

    res.status(200).json({
      status: "success",
      userData: userData,
    });
  } catch (error) {
    next(error);
  }
};
