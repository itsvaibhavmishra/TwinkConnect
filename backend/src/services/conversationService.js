import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

// find an existing direct conversation
export const findConversation = async (sender_id, receiver_id) => {
  let convos;
  if (sender_id.toString() === receiver_id.toString()) {
    convos = await ConversationModel.find({
      isGroup: false,
      users: { $all: [receiver_id], $size: 1 },
    })
      .populate("users", "-verified -password -passwordChangedAt")
      .populate("latestMessage");
  } else {
    convos = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("users", "-verified -password -passwordChangedAt")
      .populate("latestMessage");
  }

  // conversation doesnt exists
  if (!convos) {
    throw createHttpError.BadRequest(
      "Something went wrong in getting conversation"
    );
  }

  // populating messages model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "firstName lastName email avatar activityStatus",
  });

  return convos[0];
};

// create a new direct conversation
export const createConversation = async (convoData) => {
  const newConvo = await ConversationModel.create(convoData);

  if (!newConvo) {
    throw createHttpError.InternalServerError("Unable to create conversation");
  }

  const populatedConvo = await ConversationModel.findOne({
    _id: newConvo._id,
  }).populate("users", "-verified -password -passwordChangedAt");

  if (!populatedConvo) {
    throw createHttpError.BadRequest("Unable to populate conversation");
  }

  return populatedConvo;
};

// get all conversations for user
export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-verified -password -passwordChangedAt")
    .populate("admin", "-verified -password -passwordChangedAt")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "firstName lastName avatar email activityStatus",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest(
        "Error fetching conversations, try again"
      );
    });

  return conversations;
};
