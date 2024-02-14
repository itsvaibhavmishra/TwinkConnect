import createHttpError from "http-errors";

// social auth libs
import { OAuth2Client } from "google-auth-library";

import { UserModel } from "../models/index.js";
import { generateToken } from "../services/tokenService.js";
import { generatePassword } from "../utils/generatePassword.js";

// -------------------------- Google Auth --------------------------
export const googleAuth = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const client = new OAuth2Client(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET
    );

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = ticket.payload;

    if (!email_verified) {
      throw createHttpError.Unauthorized("Email Not Verified");
    }

    let user = await UserModel.findOne({ email }).select("-password");

    if (user) {
      // If user exisits
      user.verified = true;
      user.googleAuthAdded = true;
      user.onlineStatus = "online";

      await user.save();
    } else {
      // Splitting name into firstName and lastName
      let firstName = "";
      let lastName = "";
      const nameParts = name.split(" ");
      if (nameParts.length > 1) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      } else {
        // If only one word in name, set firstName to the name and lastName to onTwink
        firstName = name;
        lastName = "onTwink";
      }

      const newPass = generatePassword();

      // If user doesn't exist
      user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: picture,
        verified: true,
        googleAuthAdded: true,
        password: newPass,
        onlineStatus: "online",
      });

      await user.save();
    }

    // generating user token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.JWT_ACCESS_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.JWT_REFRESH_SECRET
    );

    // store access token to cookies
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    // store refresh token to cookies
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/auth/refresh-token",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      status: "success",
      message: "Logged In",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        activityStatus: user.activityStatus,
        onlineStatus: user.onlineStatus,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
