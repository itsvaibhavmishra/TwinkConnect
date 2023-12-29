import mongoose from "mongoose";
import validator from "validator";

const conversationSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },

    isGroup: { type: Boolean, required: true, default: false },

    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

    latestMessage: { type: mongoose.Schema.ObjectId, ref: "Messages" },

    admin: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// creating model for schema
const ConversationModel = mongoose.model("Conversations", conversationSchema);

export default ConversationModel;
