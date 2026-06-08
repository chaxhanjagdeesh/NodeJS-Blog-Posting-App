import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

function Register() {
    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black min-h-screen text-white">
            <Navbar />

            <RegisterForm />

        </div>

    );

}

export default Register;