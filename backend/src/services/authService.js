import axios from "axios";

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
