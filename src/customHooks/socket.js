import { useState, useEffect } from "react";
import * as io from "socket.io-client";

const useSocket = () => {
  const [socketConnected, setSocketConnected] = useState(true);
  const socket = io(process.env.REACT_APP_API_DOMAIN);
  return { socket };
};

export default useSocket;
