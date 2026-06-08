import { Link } from "react-router-dom";

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
