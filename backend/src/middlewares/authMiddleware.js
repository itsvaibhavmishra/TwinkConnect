import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { UserModel } from "../models/index.js";

// ------------------- Protected route middleware -------------------
export const protect = async (req, res, next) => {
  let token;

  // getting token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // getting token from cookies
  else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // token not found
  if (!token) {
    return next(createHttpError.Unauthorized("Please login first"));
  }

  // verifying token
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    // Check for token expiration
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return next(
        createHttpError.Unauthorized("Token expired, Please login again")
      );
    }

    // check for existing user with the same token
    const this_user = await UserModel.findOne({
      _id: decoded.userId,
      verified: true,
    });

    if (!this_user) {
      return next(
        createHttpError.Unauthorized("Unidentified User, Please login again")
      );
    }

    // check if the user changed the password after the new token was created
    if (this_user.changedPasswordAfter(decoded.iat, next)) {
      return next(
        createHttpError.Unauthorized("Password updated, Please login again")
      );
    }

    req.user = this_user;
    next();
  } catch (error) {
    return next(
      createHttpError.Unauthorized("Invalid token, Please login again")
    );
  }
};
