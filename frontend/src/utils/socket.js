import io from "socket.io-client";

let socket;

// connecting to socket io server from backend
const connectSocket = (token) => {
  socket = io(process.env.REACT_APP_API_ORIGIN.split("/api")[0], {
    query: `token=${token}`,
  });
};

export { socket, connectSocket };
