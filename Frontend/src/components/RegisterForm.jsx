import { Link,useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterForm() {
    const navigate = useNavigate();
    async function handleSubmit(e) {
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        const res = await api.post(
            "/auth/register",
            formData
        );
        
        if(res.data.success){
            navigate("/profile");
        }   
    } catch (err) {
        console.log(err);
    }
}

    return (
  <div className="w-full min-h-[90vh] flex items-center justify-center px-5 py-10">
    <div className="w-full max-w-2xl bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold mb-2">Create Account</h2>
        <p className="text-zinc-400">
          Join Blog Posting and start sharing your thoughts.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm text-zinc-400">
            Email Address
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">Password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="Create password"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">Username</label>
          <input
            type="text"
            required
            name="username"
            placeholder="@username"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">Full Name</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">Age</label>
          <input
            type="number"
            required
            name="age"
            placeholder="Your age"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm text-zinc-400">
            Profile Picture
          </label>
          <div className="w-full border-2 border-dashed border-zinc-700 rounded-2xl p-6 bg-zinc-800/50 hover:border-blue-500 transition">
            <input
              type="file"
              required
              name="profilePic"
              className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
          </div>
        </div>
        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 font-bold text-lg"
          >
            Create Account
          </button>
        </div>
      </form>
      <p className="text-center text-zinc-400 mt-6">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 font-semibold ml-2"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
    );
}

export default RegisterForm;
