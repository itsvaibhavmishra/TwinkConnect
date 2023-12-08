import express from "express";

// creating express app
const app = express();

// Index Route
app.get("/", (req, res) => {
  res.send("Welcome to TwinkChat Backend😺");
});

export default app;
