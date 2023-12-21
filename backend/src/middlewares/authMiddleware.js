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
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_ACCESS_SECRET
  );

  // check for existing user with same token
  const this_user = await UserModel.findById(decoded.userId);

  if (!this_user) {
    return next(createHttpError.Unauthorized("Unidentified User"));
  }

  // check if user changed password after new token was created
  if (this_user.changedPasswordAfter(decoded.iat)) {
    return next(
      createHttpError.Unauthorized(
        "Password updated, logging out! Please login again"
      )
    );
  }

  req.user = decoded;
  next();
};
