import axios from "axios";
import { generateToken } from "./tokenService.js";

export const verifyreCAPTCHA = async (recaptchaToken) => {
  // Verify reCAPTCHA token
  const { data } = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    null,
    {
      params: {
        secret: process.env.GOOGLE_RECAPTCHA_SECRET,
        response: recaptchaToken,
      },
    }
  );

  return data;
};

// generate login tokens
export const generateLoginTokens = async (user, res) => {
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
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    sameSite: "none",
    priority: "high",
  });

  // store refresh token to cookies
  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/api/auth/refresh-token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
    priority: "high",
  });

  return access_token;
};
