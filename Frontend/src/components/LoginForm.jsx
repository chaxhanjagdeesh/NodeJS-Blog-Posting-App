
 import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function LoginForm() {
    const navigate = useNavigate();
    async function handleSubmit(e) {
    e.preventDefault();
    try {
        const form = e.target;
        const data = {
            email: form.email.value,
            password: form.password.value
        };
        const res = await api.post(
            "/auth/login",
            data
        );
        console.log(res.data);
        if (res.data.success) {
            navigate("/profile");
        }
    } catch (err) {
        console.log(err);
    }
}

    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black min-h-screen text-white">
            <div className="w-full min-h-[90vh] flex items-center justify-center px-5">
                <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-extrabold mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-zinc-400">
                            Login to continue to your account
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <div>
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
                            <label className="block mb-2 text-sm text-zinc-400">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 font-bold text-lg"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-zinc-400 mt-6">
                        Don’t have an account?
                        <Link
                            to="/register"
                            className="text-blue-400 hover:text-blue-300 font-semibold ml-2"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
