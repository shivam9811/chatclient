import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

function RMessages({ socket }) {
  const [messageRecieved, setMessageRecieved] = useState([]);
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved((prev) => [
        ...prev,
        {
          message: data.message,
          userName: data.userName,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off("recieve_message");
  }, [socket]);

  useEffect(() => {
    socket.on("last_100_messages", (last100msg) => {
      last100msg = JSON.parse(last100msg);
      last100msg = sortMessagesByDate(last100msg);
      setMessageRecieved((state) => [...last100msg, ...state]);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messageRecieved]);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }
  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messageRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.userName}</span>
            <span className={styles.msgMeta}>
              {formatDate(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default RMessages;
