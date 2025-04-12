// hooks/useWebSocket.ts
import { useEffect, useState } from "react";

const useWebSocket = (
  url: string,
  onMessage: (message: MessageEvent) => void
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = onMessage;

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
};

export default useWebSocket;
