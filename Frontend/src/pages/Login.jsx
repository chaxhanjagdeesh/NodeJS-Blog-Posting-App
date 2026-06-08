import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black min-h-screen text-white">
            <Navbar />
            <LoginForm />
        </div>
    );

}

export default Login;