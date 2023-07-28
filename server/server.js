import express from "express";
import dotenv from "dotenv";
import http from "http";

// Security packages
import rateLimit from "express-rate-limit"; // limits rates of requests
import helmet from "helmet"; // sets multiple HTTP headers
import ExpressMongoSanitize from "express-mongo-sanitize"; // for sanitizing requests

import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// security middlewares
const limited = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // in 1 hour
  message: "Too many requests was made, please try again after 1 hour",
});
app.use(helmet());
app.use("/twinkchat", limited);
app.use(
  express.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Welcome to TwinkChat Backend😺");
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});

export { app };
