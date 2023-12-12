import createHttpError from "http-errors";
import validator from "validator";
import { isDisposableEmail } from "../utils/checkDispose.js";
import UserModel from "../models/userModel.js";

export const createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  //   // avatar url validator
  //   if (avatar && !validator.isURL(avatar)) {
  //     throw createHttpError.BadRequest("Avatar can only contain a url");
  //   }

  //   // Activity Status validation
  //   if (activityStatus && activityStatus.length > 64) {
  //     throw createHttpError.BadRequest(
  //       "Activity Status should not be more than 64 characters"
  //     );
  //   }

  // Creating/Adding User
};
