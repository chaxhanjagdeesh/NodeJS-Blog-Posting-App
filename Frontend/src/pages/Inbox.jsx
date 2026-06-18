import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function Inbox() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadInbox = async () => {
      try {
        const { data } = await api.get(
          "/messages",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    };
    loadInbox();
  }, []);
  
  
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
          Back
        </Link>
      </div>
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        {users.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20">
            No conversations yet.
          </div>
        ) : (
          users.map((user) => (
            <Link
              key={user._id}
              to={`/messages/${user._id}`}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition rounded-2xl p-4"
            >
              <img
                src={`http://localhost:3000/images/${user.profilePic}`}
                alt={user.username}
                className="w-14 h-14 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {user.name || user.username}
                </h2>
                <p className="text-zinc-400 text-sm">
                  @{user.username}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Inbox;