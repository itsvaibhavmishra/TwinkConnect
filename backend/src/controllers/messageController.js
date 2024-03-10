import createHttpError from "http-errors";
import {
  createMessage,
  getConvoMessages,
  populateMessage,
  updateLatestMessage,
  validateFriendship,
} from "../services/messageService.js";
import { ConversationModel } from "../models/index.js";

// -------------------------- Send Message --------------------------
export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      throw createHttpError.BadRequest("Invalid conversation id or message");
    }

    const convo_exists = await ConversationModel.findById({ _id: convo_id });

    if (!convo_exists) {
      throw createHttpError.NotFound("Conversation does not exist");
    }

    // Check if there's only one user in the conversation and it's the current user
    if (
      !(
        convo_exists.users.length === 1 &&
        convo_exists.users[0].toString() === user_id.toString()
      )
    ) {
      // Check if users are friends
      await validateFriendship(user_id, convo_exists);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    const newMessage = await createMessage(msgData);

    await updateLatestMessage(convo_id, newMessage);

    const populatedMessage = await populateMessage(newMessage._id);

    res.status(200).json({ status: "success", message: populatedMessage });
  } catch (error) {
    next(error);
  }
};

// -------------------------- Get All Messages --------------------------
export const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;

    if (!convo_id) {
      throw createHttpError.BadRequest("Conversation id is required");
    }

    const messages = await getConvoMessages(convo_id);

    res.status(200).json({ status: "success", messages: messages });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------------------

// -------------------------- Socket Send Message --------------------------
export const socketSendMessage = async (socket, user_id, messageData) => {
  try {
    const { _id, message, conversation, files } = messageData;

    const convo_id = conversation._id;

    if (!convo_id || (!message && !files)) {
      throw createHttpError.BadRequest("Invalid conversation id or message");
    }

    const convo_exists = await ConversationModel.findById({ _id: convo_id });

    if (!convo_exists) {
      throw createHttpError.NotFound("Conversation does not exist");
    }

    // Check if there's only one user in the conversation and it's the current user
    if (
      !(
        convo_exists.users.length === 1 &&
        convo_exists.users[0].toString() === user_id.toString()
      )
    ) {
      // Check if users are friends
      await validateFriendship(user_id, convo_exists);
    }

    const msgData = {
      _id: _id,
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    const newMessage = await createMessage(msgData);

    await updateLatestMessage(convo_id, newMessage);

    const populatedMessage = await populateMessage(newMessage._id);

    return { message: populatedMessage };
  } catch (error) {
    console.log(error);
    socket.errorHandler(error.message);
  }
};
