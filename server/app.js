import express from "express";
import dotenv from "dotenv";

// Security packages
import rateLimit from "express-rate-limit"; // limits rates of requests
import helmet from "helmet"; // sets multiple HTTP headers
import ExpressMongoSanitize from "express-mongo-sanitize"; // for sanitizing requests
import xss from "xss-clean";

import cors from "cors";
import bodyParser from "body-parser";

// cookies
import cookieParser from "cookie-parser";
import session from "cookie-session";

// routes
import router from "./routes/index.js";

dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.FRONT_ORIGIN, // either set to * or add your frontend url for cors
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);

// security middlewares
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // in 1 hour
  message: "Too many requests was made, please try again after 1 hour",
});
app.use(helmet());
app.use("/twinkchat", limiter);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(ExpressMongoSanitize());
app.use(xss());

// Index Route
app.get("/", (req, res) => {
  res.send("Welcome to TwinkChat Backend😺");
});

// api routes
app.use(router);

export { app };
