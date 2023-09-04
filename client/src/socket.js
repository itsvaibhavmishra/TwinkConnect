import io from "socket.io-client";

let socket;

// connecting to socket io server from backend
const conenctSocket = (user_id) => {
  socket = io(process.env.REACT_APP_API_ORIGIN, {
    query: `user_id=${user_id}`,
  });
};

export { socket, conenctSocket };
