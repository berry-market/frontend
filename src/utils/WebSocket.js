import { useRef, useState, useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import { SERVER_URL } from "../api/ApiConfig";

export const useWebSocket = () => {
  const client = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const connect = useCallback(
    (topic, onMessageReceived) => {
      if (retryAttempts >= 10) {
        return;
      }

      if (client.current && client.current.connected) {
        return;
      }

      client.current = new StompJs.Client({
        brokerURL: `ws://${SERVER_URL}/ws`,
        connectHeaders: {
          Authorization: localStorage.getItem("Authorization"),
        },
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          setIsConnected(true);
          setRetryAttempts(0);

          if (topic && onMessageReceived) {
            client.current.subscribe(topic, (message) => {
              const body = JSON.parse(message.body);
              onMessageReceived(body);
            });
          }
        },
        onDisconnect: () => {
          setIsConnected(false);
        },
        onStompError: () => {
          setRetryAttempts((prev) => prev + 1);
        },
        onWebSocketClose: () => {
          setRetryAttempts((prev) => prev + 1);
        },
      });
      client.current.activate();
    },
    [retryAttempts]
  );

  const sendMessage = useCallback((destination, body) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("WebSocket is not connected.");
    }
  }, []);

  const disconnect = useCallback(() => {
    if (client.current) {
      client.current.deactivate();
      setIsConnected(false);
      setRetryAttempts(0);
    }
  }, []);

  return { connect, sendMessage, disconnect, isConnected, retryAttempts };
};
