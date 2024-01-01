import createHttpError from "http-errors";
import {
  createMessage,
  getConvoMessages,
  populateMessage,
  updateLatestMessage,
} from "../services/messageService.js";

// -------------------------- Send Message --------------------------
export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      throw createHttpError.BadRequest("Invalid conversation id or message");
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    const newMessage = await createMessage(msgData);

    const populatedMessage = await populateMessage(newMessage._id);

    await updateLatestMessage(convo_id, newMessage);

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
