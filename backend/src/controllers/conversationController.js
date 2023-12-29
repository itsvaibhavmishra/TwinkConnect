import createHttpError from "http-errors";
import validator from "validator";

import { filterObj } from "../utils/filterObj.js";
import { ConversationModel, UserModel } from "../models/index.js";
import { doesConversationExist } from "../services/conversationService.js";

// -------------------------- Create/Open Conversation --------------------------
export const createOpenConversation = async (req, res, next) => {
  try {
    const sender_id = req.user._id;
    const { receiver_id } = req.body;

    // check for required fields
    if (!receiver_id) {
      throw createHttpError.BadRequest("Something went wrong");
    }

    // check if receiver exists
    const receiver = await UserModel.findOne({
      _id: receiver_id,
      verified: true,
    });

    // check if receiver exists
    if (!receiver) {
      throw createHttpError.NotFound("Verified Receiver does not exist");
    }

    // check for existing conversation
    const existing_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existing_conversation) {
      res.status(200).json({
        status: "success",
        conversation: existing_conversation,
      });
    }

    // creating a new conversation
    let convoData = {
      name: `${receiver.firstName} ${receiver.lastName}`,
      isGroup: false,
      users: [sender_id, receiver_id],
    };

    const newConvo = await ConversationModel.create(convoData);

    if (!newConvo) {
      throw createHttpError.InternalServerError(
        "Unable to create conversation"
      );
    }

    res.status(200).json({
      status: "success",
      conversation: newConvo,
    });
  } catch (error) {
    next(error);
  }
};
