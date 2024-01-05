import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },

    message: { type: String, trim: true },

    conversation: { type: mongoose.Schema.ObjectId, ref: "Conversation" },

    files: [],
  },
  {
    timestamps: true,
  }
);

// creating model for schema
const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
