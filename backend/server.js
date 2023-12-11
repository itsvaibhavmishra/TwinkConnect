import http from "http";

import app from "./app.js";

// env variables
const port = process.env.PORT || "5000";

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
