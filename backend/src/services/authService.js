import createHttpError from "http-errors";
import validator from "validator";
import { isDisposableEmail } from "../utils/checkDispose.js";

export const createUser = async (userData) => {
  const { firstName, lastName, email, avatar, activityStatus, password } =
    userData;

  // check for empty fields
  if (!firstName || !lastName || !email || !password) {
    throw createHttpError.BadRequest(
      "Required fields: firstName, lastName, email & password"
    );
  }

  // Name validation
  if (
    !validator.isLength(firstName, { min: 3, max: 16 }) ||
    !validator.isLength(lastName, { min: 3, max: 16 })
  ) {
    throw createHttpError.BadRequest(
      "First and Last Name each must be between 3-16 characters long"
    );
  }

  // Email validation
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Invalid Email");
  }

  // Check if email is disposable
  const isDisposable = await isDisposableEmail(email);

  if (isDisposable) {
    throw createHttpError.BadRequest("Disposable emails are not allowed");
  }

  // Activity Status validation
  if (activityStatus && activityStatus.length > 64) {
    throw createHttpError.BadRequest(
      "Activity Status should not be more than 64 characters"
    );
  }
};
