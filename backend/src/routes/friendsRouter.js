import express from "express";
import trimRequest from "trim-request";

import { protect } from "../middlewares/authMiddleware.js";
import {
  acceptRequest,
  cancelRequest,
  getFriends,
  getRequests,
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

// Accept Friend Request
friendsRouter
  .route("/accept-request")
  .post(trimRequest.all, protect, acceptRequest);

// Remove Friend
friendsRouter
  .route("/remove-friend")
  .post(trimRequest.all, protect, removeFriend);

// Get List of Friends
friendsRouter.route("/get-friends").get(trimRequest.all, protect, getFriends);

// Search for Friends
friendsRouter.route("/search").get(trimRequest.all, protect, searchFriends);

// Get List of Friend Requests
friendsRouter.route("/get-requests").get(trimRequest.all, protect, getRequests);

export default friendsRouter;
