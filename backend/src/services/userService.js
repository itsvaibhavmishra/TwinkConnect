import createHttpError from "http-errors";
import sizeOf from "image-size";
import validator from "validator";

import { FriendRequestModel, UserModel } from "../models/index.js";

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
export const searchForUsers = async (
  keyword,
  page,
  friends_ids,
  currentUser_id
) => {
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

  // Perform the search including requestSent field
  users = await UserModel.aggregate([
    { $match: searchCriteria },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        avatar: 1,
        activityStatus: 1,
        onlineStatus: 1,
        // Check if a friend request has been sent to this user
        requestSent: {
          $cond: {
            if: {
              $in: ["$_id", friends_ids],
            },
            then: false, // If user is already a friend, requestSent is false
            else: {
              $in: [
                "$_id",
                await FriendRequestModel.find({
                  sender: currentUser_id,
                }).distinct("recipient"),
              ],
            },
          },
        },
      },
    },
  ]);

  // Get the total count for pagination
  totalCount = users.length;

  // Paginate the results
  users = users.slice(page * pageSize, (page + 1) * pageSize);

  return { users, totalCount };
};
