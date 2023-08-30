import styles from "./styles.module.css";
import RMessages from "./RMessages";
import SendMessage from "./SendMessage";
import RoomAndUsers from "./RoomAndUsers";

function Chat({ socket, userName, room }) {
  userName = localStorage.getItem("userName");
  room = localStorage.getItem("room");
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} userName={userName} room={room} />
      <div>
        <RMessages socket={socket} />
        <SendMessage socket={socket} userName={userName} room={room} />
      </div>
    </div>
  );
}

export default Chat;
