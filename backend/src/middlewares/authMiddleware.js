import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

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

  // token not found
  if (!token) {
    return next(createHttpError.Unauthorized("Please login first"));
  }

  // verifying token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
    if (err) {
      return next(createHttpError.Unauthorized("Please login first"));
    }
    req.user = payload;
    next();
  });
};
