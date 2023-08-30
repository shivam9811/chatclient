import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./pages/Chat/Chat";

let socket = io.connect("https://chat-api-gbwl.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          socket={socket}
          userName={userName}
          room={room}
          setUserName={setUserName}
          setRoom={setRoom}
        />
      ),
    },
    {
      path: "/chat",
      element: <Chat socket={socket} userName={userName} room={room} />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
