import createHttpError from "http-errors";
import { ConversationModel, MessageModel } from "../models/index.js";

// send a new message with conversation id
export const createMessage = async (data) => {
  const newMessage = await MessageModel.create(data);

  if (!newMessage) {
    throw createHttpError.BadRequest("Unable to create new message");
  }

  return newMessage;
};

// populate message with data
export const populateMessage = async (id) => {
  const msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "firstName lastName avatar",
      model: "User",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "Conversation",
      populate: {
        path: "users",
        select: "firstName lastName avatar email activityStatus",
        model: "User",
      },
    });

  if (!msg) {
    throw createHttpError.BadRequest("Unable to populate message");
  }

  return msg;
};

// update latest message on conversation model
export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });

  if (!updatedConvo) {
    throw createHttpError.BadRequest("Unable to update latest message");
  }

  return updatedConvo;
};

// fetch all messages with conversation id
export const getConvoMessages = async (convo_id) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "firstName lastName avatar email activityStatus")
    .populate("conversation");

  if (!messages) {
    throw createHttpError.BadRequest("Unable to fetch messages");
  }

  return messages;
};
