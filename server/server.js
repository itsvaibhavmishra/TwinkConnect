import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to TwinkChat Backend");
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

export { app };
