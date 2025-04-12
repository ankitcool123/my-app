// components/Messages.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authUserAtom } from "../../state";
import useWebSocket from "./useWebSocket";
import { messagesAtom } from "../../state/userAtom";
import { Message } from "./Message";
const baseUrl: any = process.env.REACT_APP_BASE_URL;

// interface Message {
//   messageSent: any;
//   senderUsername: string;
//   senderPhotoUrl: string;
//   content: string;
//   tempId?: number;
// }

interface Props {
  data: string;
}

const Messages: React.FC<Props> = ({ data: recipientUsername }) => {
  const [authUser]: any = useRecoilState(authUserAtom);
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [messages, setMessages] = useRecoilState(messagesAtom);
  const messages = useRecoilValue(messagesAtom);
const setMessages = useSetRecoilState(messagesAtom);
  const [content, setContent] = useState("");

  const localUser: any = localStorage.getItem("user");
  const parsedUser = JSON.parse(localUser);

  const authHeaders = {
    headers: { Authorization: `Bearer ${authUser.token}` },
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}Messages/thread/${recipientUsername}`,
        authHeaders
      );
  
      // Make sure they're in oldest -> newest order
      const sorted = [...response.data].sort((a, b) =>
        new Date(a.messageSent).getTime() - new Date(b.messageSent).getTime()
      );
  
      setMessages(sorted);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  

  const handleSocketMessage = (event: MessageEvent) => {
    try {
      if (!event.data.startsWith("Server received: ")) {
        const message = JSON.parse(event.data);
  
        // Enrich sender photo
        if (!message.senderPhotoUrl) {
          message.senderPhotoUrl =
            message.senderUsername === authUser.username
              ? authUser.photoUrl
              : "/default-user.png";
        }
  
        // Check if already exists (simple way using timestamp + content)
        const exists = messages.some(
          (m) =>
            m.content === message.content &&
            m.senderUsername === message.senderUsername &&
            m.messageSent === message.messageSent
        );
  
        if (!exists) {
          // setMessages((prev) => [...prev, message]);
          // var msg = new Message(){
          //   content : message.Content
          // }
          let ms: Message ={ content : message.Content, messageSent : message.MessageSent, 
            senderUsername : message.SenderUsername, senderPhotoUrl : message.senderPhotoUrl
          };
          setMessages((prev) => [...prev, ms]);
          console.log("📥 Appended new message via WebSocket:", ms);
        } else {
          console.log("⚠️ Skipped duplicate message via WebSocket:", message);
        }
      }
    } catch (error) {
      console.warn("Non-JSON message:", event.data);
    }
  };
  
  
  
  const socket = useWebSocket(
    `wss://localhost:5001/api/Messages/ws/${authUser.username}`,
    handleSocketMessage
  );

  useEffect(() => {
    fetchMessages();
  }, [recipientUsername]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!socket || content.trim() === "") return;

    const messageData = {
      recipientUsername,
      content,
    };

    const optimisticMessage: Message = {
      senderUsername: parsedUser.username,
      senderPhotoUrl: authUser.photoUrl,
      content,
      tempId: Date.now(),
      messageSent: undefined
    };

    //setMessages((prev) => [...(prev || []), optimisticMessage]);
    setContent("");
    socket.send(JSON.stringify(messageData));
    scrollToBottom();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSubmit(event);
  };
  useEffect(() => {
    if (socket) {
      console.log("✅ WebSocket connected for", authUser.username);
    } else {
      console.warn("⚠️ WebSocket not connected!");
    }
  }, [socket]);
  

  return (
    <div className="mainC">
      <div className="container">
        <div className="card">
          <div
            className="card-list"
            style={{
              backgroundColor: "whitesmoke",
              height: "60vh",
              overflowY: "auto",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Array.isArray(messages) &&
            messages?.map((item, index) => {
              const isSender = item.senderUsername === parsedUser.username;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isSender ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "60%",
                      backgroundColor: isSender ? "#DCF8C6" : "#FFF",
                      borderRadius: "15px",
                      padding: "10px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.senderPhotoUrl}
                      alt="user"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <div style={{ color: "black" }}>{item?.content}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              onKeyDown={handleKeyPress}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message..."
              style={{ width: "90%" }}
            />
            <button
              className="btn"
              onClick={handleSubmit}
              style={{ width: "10%", color: "black", borderColor: "black" }}
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
