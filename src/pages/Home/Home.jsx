import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function Home({ socket, setRoom, setUserName, userName, room }) {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("join_room", { userName, room });
      localStorage.setItem("userName", userName);
      localStorage.setItem("room", room);
    }
    navigate("/chat");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <select
          className={styles.input}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        >
          <option>-- Select Room --</option>
          <option value="ichi">ICHI</option>
          <option value="ni">NI</option>
          <option value="san">SAN</option>
          <option value="yon">YON</option>
        </select>

        <button
          onClick={joinRoom}
          className="btn btn-secondary"
          style={{ width: "100%" }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Home;
