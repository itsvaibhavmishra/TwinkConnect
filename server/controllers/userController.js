import User from "../models/userModel.js";
import { filterObj } from "../utils/filterObj.js";

// -------------------------- Verified Users List --------------------------
export const getUsers = async (req, res, next) => {
  // getting all verified users from DB
  const all_users = await User.find({
    verified: true,
  }).select("firstName lastName _id"); // only fetching required fields

  const this_user = req.user; // getting current user

  // users not in friend list
  const remaining_user = all_users.filter(
    (user) =>
      // users not in this_user friend list
      !this.user.friends.includes(user._id) &&
      // does not includes itself {User 1 will not be present in this list}
      user._id.toString() !== req.user._id.toString()
  );

  res.status(200).json({
    status: "success",
    message: "Users Found!",
    data: remaining_user,
  });
};

// -------------------------- User Profile --------------------------
export const upadteProfile = async (req, res, next) => {
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
};
