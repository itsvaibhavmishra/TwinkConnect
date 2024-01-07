// model for friend requests
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  sender: {
    // reffering to the users id
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const FriendRequestModel = mongoose.model("FriendRequest", requestSchema);

export default FriendRequestModel;
