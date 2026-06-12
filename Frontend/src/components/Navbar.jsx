import { Link } from "react-router-dom";
import Menu from "./RedirectionMenu";

function Navbar({ user }) {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Blog Posting
          </h1>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={`http://localhost:3000/images/${user.profilePic}`}
                alt=""
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <p className="text-xs text-zinc-400">Welcome back</p>

                <h2 className="font-semibold text-lg">{user.name}</h2>
              </div>
              <a
                href="/messages"
                class="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-cyan-600 transition group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-white group-hover:scale-110 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </a>

              <Menu />
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-5 py-2 rounded-xl bg-zinc-800">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-5 py-2 rounded-xl bg-blue-600">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
