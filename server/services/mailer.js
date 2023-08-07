import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let config = {
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // gmail email
    pass: process.env.MAIL_PASS, // gmail password
  },
};

export const transporter = nodemailer.createTransport(config);
