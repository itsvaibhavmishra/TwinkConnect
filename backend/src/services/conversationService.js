import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password -passwordChangedAt")
    .populate("latestMessage");

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
