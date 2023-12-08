import http from "http";
import dotenv from "dotenv";

import app from "./app.js";

// dotenv config
dotenv.config();

// env variables
const port = process.env.PORT || "5000";

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
