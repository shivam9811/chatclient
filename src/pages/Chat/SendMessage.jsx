import React, { useState } from "react";
import styles from "./styles.module.css";

function SendMessage({ socket, userName, room }) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { userName, room, message, __createdtime__ });
      setMessage("");
    }
  };
  return (
    <div>
      <div className={styles.sendMessageContainer}>
        <input
          className={styles.messageInput}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="btn btn-primary" onClick={send}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default SendMessage;
