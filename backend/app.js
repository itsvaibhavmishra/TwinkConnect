import express from "express";
import dotenv from "dotenv";

// security packages
import cors from "cors";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";

// dotenv config
dotenv.config();

// creating express app
const app = express();

// cors setup
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:3000",
  })
);

// parsing data to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// security middlewares
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // in 1 hour
  message: "Too many requests was made, please try again after 1 hour",
});
app.use("/", limiter); // limits rates of requests
app.use(helmet()); // general security
app.use(xss()); // xss protection
app.use(mongoSanitize()); // sanitization for mongodb
app.use(cookieParser()); // parsing cookies
app.use(compression()); // gzip compression

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Index Route
app.get("/", (req, res) => {
  res.send("Welcome to TwinkChat Backend😺");
});

export default app;