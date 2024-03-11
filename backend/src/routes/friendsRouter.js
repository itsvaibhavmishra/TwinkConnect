import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import {
  acceptRejectRequest,
  cancelRequest,
  getFriends,
  getOnlineFriends,
  getRequests,
  getSentRequests,
  removeFriend,
  searchFriends,
  sendRequest,
} from "../controllers/friendsController.js";

const friendsRouter = express.Router();

// Send Friend Request
friendsRouter
  .route("/send-request")
  .post(trimRequest.all, protect, sendRequest);

// Cancel Friend Request
friendsRouter
  .route("/cancel-request")
  .post(trimRequest.all, protect, cancelRequest);

// Accept/Reject Friend Request
friendsRouter
  .route("/accept-reject-request")
  .post(trimRequest.all, protect, acceptRejectRequest);

// Remove Friend
friendsRouter
  .route("/remove-friend")
  .post(trimRequest.all, protect, removeFriend);

// Get List of Friends
friendsRouter.route("/get-friends").get(trimRequest.all, protect, getFriends);

// Get List of Online Friends
friendsRouter
  .route("/online-friends")
  .get(trimRequest.all, protect, getOnlineFriends);

// Search for Friends
friendsRouter.route("/search").get(trimRequest.all, protect, searchFriends);

// Get List of Friend Requests
friendsRouter.route("/get-requests").get(trimRequest.all, protect, getRequests);

// Get List of Friend Requests
friendsRouter
  .route("/get-sent-requests")
  .get(trimRequest.all, protect, getSentRequests);

export default friendsRouter;
