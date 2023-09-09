import FriendRequest from "../models/requestModel.js";
import User from "../models/userModel.js";
import { filterObj } from "../utils/filterObj.js";

// -------------------------- Verified Users List --------------------------
export const getUsers = async (req, res, next) => {
  try {
    // getting all verified users from DB
    const all_users = await User.find({
      verified: true,
    }).select("firstName lastName _id"); // only fetching required fields

    const this_user = req.user; // getting current user

    // users not in friend list
    const remaining_user = all_users.filter(
      (user) =>
        // users not in this_user friend list
        !this_user.friends.includes(user._id) &&
        // does not includes itself {User 1 will not be present in this list}
        user._id.toString() !== req.user._id.toString()
    );

    // Get the users to whom the current user has sent friend requests
    const sentFriendRequests = await FriendRequest.find({
      sender: this_user._id,
    }).populate("recipient", "firstName lastName _id");

    res.status(200).json({
      status: "success",
      message: "Users Found!",
      data: {
        remaining_user,
        sentFriendRequests: sentFriendRequests.map(
          (request) => request.recipient
        ),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Unable to get All Users: ${error}`,
    });
  }
};

// -------------------------- Getting User Friends --------------------------
export const getFriends = async (req, res, next) => {
  try {
    const this_user = await User.findById(req.user._id).populate(
      "friends",
      "_id firstName lastName"
    ); // getting all friends from DB

    res.status(200).json({
      status: "success",
      message: "Friends List Found!",
      data: this_user.friends,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Unable to get Users Friends List: ${error}`,
    });
  }
};

// -------------------------- Getting All Friend Requests --------------------------
export const getRequests = async (req, res, next) => {
  try {
    const requests = await FriendRequest.find({
      recipient: req.user._id,
    }).populate("sender", "_id firstName lastName");

    res.status(200).json({
      status: "success",
      message: "Friend Requests List Found!",
      data: requests,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Unable to get Friend Request: ${error}`,
    });
  }
};

// -------------------------- User Profile --------------------------
export const upadteProfile = async (req, res, next) => {
  try {
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "about",
      "avatar"
    );

    const updated_user = await User.create(filteredBody);

    res.status(200).json({
      status: "success",
      data: updated_user,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Unable to Update Users Profile: ${error}`,
    });
  }
};
