import React, { useState, useEffect } from "react";
import { useWebSocket } from "../../utils/WebSocket";
import styles from "./BidChat.module.css";
import { Input, Button } from "../../components/StyledComponents";

const BidChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { connect, sendMessage, disconnect, isConnected, retryAttempts } =
    useWebSocket();

  const postId = 1; // 더미 postId
  const topic = `/topic/bids-chat/${postId}`;

  useEffect(() => {
    const onMessageReceived = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    connect(topic, onMessageReceived);

    return () => {
      disconnect();
    };
  }, [connect, disconnect, topic]);

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (retryAttempts >= 10) {
      alert("입찰 채팅방 접속에 실패했습니다. 잠시 후 다시 시도해주세요.");
      disconnect();
      onClose();
    }
  }, [retryAttempts, disconnect, onClose]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("메시지를 입력하세요.");
      return;
    }
    sendMessage(`/app/api/v1/posts/${postId}/bids-chat`, {
      amount: parseInt(message, 10),
    });
    setMessage("");
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>잠시만 기다려주세요...</p>
      </div>
    );
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <p>라이브: **명</p>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <span>{msg.nickname}</span>님이 <span>{msg.amount}</span>원에
            입찰하셨습니다{" "}
            <span>({new Date(msg.createdAt).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <div className={styles.amount_input}>
        <Input
          type="number"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="입찰 금액을 입력하세요"
        />
        <Button onClick={handleSendMessage} disabled={!isConnected}>
          입찰하기
        </Button>
      </div>
    </div>
  );
};

export default BidChat;
