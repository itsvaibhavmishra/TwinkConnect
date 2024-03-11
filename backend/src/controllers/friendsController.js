import createHttpError from "http-errors";

import { FriendRequestModel, UserModel } from "../models/index.js";
import { searchForFriends } from "../services/friendsService.js";

// -------------------------- Send Request --------------------------
export const sendRequest = async (req, res, next) => {
  try {
    const sender = req.user;
    const { receiver_id } = req.body;

    // check for required fields
    if (!receiver_id) {
      throw createHttpError.BadRequest("Required field: receiver_id");
    }

    // check if verified receiver exists
    const receiver = await UserModel.findOne({
      _id: receiver_id,
      verified: true,
    }).select("-password -passwordChangedAt");

    if (!receiver) {
      throw createHttpError.NotFound("User does not exisit");
    }

    // check if sender is same as receiver
    if (sender._id.toString() === receiver._id.toString()) {
      throw createHttpError.BadRequest("Something went wrong");
    }

    // check if they are already friends
    if (
      receiver.friends.includes(sender._id) ||
      sender.friends.includes(receiver._id)
    ) {
      throw createHttpError.BadRequest("You are already friends");
    }

    // check if there is an existing friend request
    const existingRequest = await FriendRequestModel.findOne({
      sender: sender._id,
      recipient: receiver._id,
    });

    if (existingRequest) {
      throw createHttpError.BadRequest("Friend request already sent");
    }

    // create a new friend request
    const newFriendRequest = new FriendRequestModel({
      sender: sender._id,
      recipient: receiver._id,
    });

    await newFriendRequest.save();

    res.status(200).json({
      status: "success",
      message: "Friend request sent successfully",
      sender: {
        _id: sender._id,
        firstName: sender.firstName,
        lastName: sender.lastName,
      },
      receiver: {
        _id: receiver._id,
        firstName: receiver.firstName,
        lastName: receiver.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Cancel Request -----------------------
export const cancelRequest = async (req, res, next) => {
  try {
    const sender_id = req.user._id;
    const { receiver_id } = req.body;

    // check for required fields
    if (!receiver_id) {
      throw createHttpError.BadRequest("Required field: receiver_id");
    }

    // check if sender is same as receiver
    if (sender_id.toString() === receiver_id.toString()) {
      throw createHttpError.BadRequest("Something went wrong");
    }

    // find the friend request
    const friendRequest = await FriendRequestModel.findOne({
      $or: [
        { sender: sender_id, recipient: receiver_id },
        { sender: receiver_id, recipient: sender_id },
      ],
    });

    // check if the friend request exists
    if (!friendRequest) {
      throw createHttpError.NotFound("Friend request not found");
    }

    // remove the friend request
    await friendRequest.deleteOne();

    res.status(200).json({
      status: "info",
      message: "Friend request canceled",
      receiver_id,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Accept/Reject Request -----------------------
export const acceptRejectRequest = async (req, res, next) => {
  try {
    const receiver_id = req.user._id;
    const { sender_id, action_type } = req.body;

    // check for required fields
    if (!sender_id || !action_type) {
      throw createHttpError.BadRequest(
        "Required Fields: sender_id, action_type"
      );
    }

    // check if sender is same as receiver
    if (receiver_id.toString() === sender_id.toString()) {
      throw createHttpError.BadRequest("Something went wrong");
    }

    // find the friend request
    const friendRequest = await FriendRequestModel.findOne({
      sender: sender_id,
      recipient: receiver_id,
    });

    // check if the friend request exists
    if (!friendRequest) {
      throw createHttpError.NotFound("Friend request not found");
    }

    // remove the friend request
    await friendRequest.deleteOne();

    if (action_type.toLowerCase() === "reject") {
      res.status(200).json({
        status: "info",
        message: "Friend request rejected",
        sender_id,
      });
    } else {
      // update friends list for both sender and receiver
      await UserModel.findByIdAndUpdate(sender_id, {
        $push: { friends: receiver_id },
      });
      await UserModel.findByIdAndUpdate(receiver_id, {
        $push: { friends: sender_id },
      });

      res.status(200).json({
        status: "success",
        message: "Friend request accepted",
        sender_id,
      });
    }
  } catch (error) {
    next(error);
  }
};

// ----------------------- Remove Friend -----------------------
export const removeFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend_id } = req.body;

    // check if user_id is same as friend_id
    if (user._id.toString() === friend_id.toString()) {
      throw createHttpError.BadRequest("Something went wrong");
    }

    // check for required fields
    if (!friend_id) {
      throw createHttpError.BadRequest("Required Field: friend_id");
    }

    // check if the friend exists in the user's friends list
    if (!user.friends.includes(friend_id)) {
      throw createHttpError.NotFound("Friend not found in your friends list");
    }

    // remove the friend from the user's friends list
    await UserModel.findByIdAndUpdate(user._id, {
      $pull: { friends: friend_id },
    });

    // remove the user from the friend's friends list
    await UserModel.findByIdAndUpdate(friend_id, {
      $pull: { friends: user._id },
    });

    res.status(200).json({
      status: "success",
      message: "Friend removed successfully",
      friend_id: friend_id,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Get Friends List -----------------------
export const getFriends = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    // find the user and populate the friends list
    const user = await UserModel.findById(user_id).populate(
      "friends",
      "_id firstName lastName avatar activityStatus onlineStatus email"
    );

    // return list of friends for current user
    res.status(200).json({
      status: "success",
      friends: user.friends,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Get Online Friends List -----------------------
export const getOnlineFriends = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    // find the user and populate the friends list
    const user = await UserModel.findById(user_id).populate(
      "friends",
      "_id firstName lastName avatar onlineStatus"
    );

    // filter online friends
    const onlineFriends = user.friends.filter(
      (friend) => friend.onlineStatus === "online"
    );

    // return list of friends for current user
    res.status(200).json({
      status: "success",
      onlineFriends: onlineFriends,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Search Friends -----------------------
export const searchFriends = async (req, res, next) => {
  try {
    const current_user = req.user;

    const keyword = req.query.search;
    const page = req.query.page || "0";

    // check for required fields
    if (!keyword) {
      throw createHttpError.BadRequest("Query required");
    }

    // Populate friends data for the current user
    const users = await UserModel.findById(current_user._id)
      .select("friends")
      .populate({
        path: "friends",
        select: "firstName lastName _id email verified",
      });

    const { friends, totalCount } = await searchForFriends(
      users,
      keyword,
      page
    );

    // return list of friends for current user
    res.status(200).json({
      status: "success",
      usersFound: totalCount,
      friends: friends,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Get Friend Requests -----------------------
export const getRequests = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    // find friend requests where the current user is the recipient
    const friendRequests = await FriendRequestModel.find({
      recipient: user_id,
    }).populate("sender", "_id firstName lastName avatar activityStatus email");

    res.status(200).json({
      status: "success",
      friendRequests,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Get Sent Requests -----------------------
export const getSentRequests = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    // Aggregate pipeline to fetch sent requests and add requestSent field
    const sentRequests = await FriendRequestModel.aggregate([
      {
        $match: { sender: user_id },
      },
      {
        $lookup: {
          from: "users",
          localField: "recipient",
          foreignField: "_id",
          as: "recipient",
        },
      },
      { $unwind: "$recipient" },
      {
        // Add extra fields
        $addFields: {
          "recipient.isSent": true,
          "recipient.receiver_id": "$recipient._id",
        },
      },
      {
        // Project only recipient object
        $project: {
          _id: "$recipient._id",
          firstName: "$recipient.firstName",
          lastName: "$recipient.lastName",
          avatar: "$recipient.avatar",
          activityStatus: "$recipient.activityStatus",
          email: "$recipient.email",
          isSent: "$recipient.isSent",
          receiverId: "$recipient.receiver_id",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      sentRequests,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------

// ----------------------- Socket: Friend Status -----------------------
export const emitFriendStatus = async (io, socket, user, onlineStatus) => {
  try {
    user.friends.forEach((friend) => {
      const friend_id = friend._id.toString();
      io.to(friend_id).emit("online_friends", {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        onlineStatus: onlineStatus,
      });
    });
  } catch (error) {
    socket.errorHandler("Online friends error");
  }
};
