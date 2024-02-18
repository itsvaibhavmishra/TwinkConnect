import createHttpError from "http-errors";
import axios from "axios";

import { UserModel } from "../models/index.js";
import { generatePassword } from "../utils/generatePassword.js";
import { generateLoginTokens } from "../services/userService.js";

const userData = (user, access_token) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    email: user.email,
    activityStatus: user.activityStatus,
    onlineStatus: user.onlineStatus,
    token: access_token,
  };
};

// -------------------------- Google Auth --------------------------
export const googleAuth = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      throw createHttpError.BadRequest("Unable to sign in using Google");
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      }
    );

    const { email_verified, email, name, picture } = data;

    if (!email_verified) {
      throw createHttpError.Unauthorized("Google Email is Not Verified");
    }

    let user = await UserModel.findOne({ email }).select("-password");

    if (user) {
      // If user exisits
      user.verified = true;
      // Check if Google is already connected
      if (!user.socialsConnected.includes("google")) {
        user.socialsConnected.push("google");
      }

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
        socialsConnected: ["google"],
      });

      await user.save();
    }

    // generating login tokens
    const access_token = await generateLoginTokens(user, res);

    return res.status(200).json({
      status: "success",
      message: "Logged In",
      user: userData(user, access_token),
    });
  } catch (error) {
    next(error);
  }
};
