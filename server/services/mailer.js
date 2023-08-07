import nodemailer from "nodemailer";

const config = {
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // gmail email
    password: process.env.MAIL_PASS, // gmail password
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async ({ from, to, subject, text }) => {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
