import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

function Messages() {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const loadChat = async () => {
      try {
        const { data } = await api.get(
          `/messages/${id}`,
          {
            withCredentials: true,
          }
        );
        setReceiver(data.receiver);
        setCurrentUser(data.currentUser);
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      }
    };

    loadChat();
  }, [id]);

  useEffect(() => {
    if (!currentUser || !receiver) return;
    const sender = currentUser.userid;
    const receiverId = receiver._id;
    const roomId = [sender, receiverId].sort().join("_");
    socket.emit("join-room", roomId);
    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [currentUser, receiver]);

  
  const sendMessage = () => {
    if (!text.trim() || !currentUser || !receiver) return;
    socket.emit("send-message", {
      sender: currentUser.userid,
      receiver: receiver._id,
      text,
    });
    setText("");
  };
  
  if (!receiver || !currentUser) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white h-screen flex flex-col">
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center gap-4">
        <Link to="/messages" className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
          Back
        </Link>
        <img
          src={`http://localhost:3000/images/${receiver.profilePic}`}
          alt={receiver.username}
          className="w-12 h-12 rounded-full object-cover border border-zinc-700"
        />
        <div>
          <h1 className="text-lg font-bold">
            {receiver.name || receiver.username}
          </h1>
          <p className="text-sm text-zinc-400">
            @{receiver.username}
          </p>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.map((message, index) => {
          const senderId =
            typeof message.sender === "object"
              ? message.sender._id
              : message.sender;
          const isMine = senderId === currentUser.userid;
          return (
            <div
              key={message._id || index}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-[70%] ${
                  isMine
                    ? "bg-blue-600 rounded-br-md"
                    : "bg-zinc-800 border border-zinc-700 rounded-bl-md"
                }`}
              >
                <p className="text-sm break-words">
                  {message.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-zinc-800 bg-zinc-900 p-5">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;