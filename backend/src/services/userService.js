import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";

// find a user based on userId
export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);

  if (!user)
    throw createHttpError.NotFound("Invalid User ID or User not found");

  return user;
};
