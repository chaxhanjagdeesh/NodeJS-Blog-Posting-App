import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Inbox from "./pages/Inbox";
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages/:id" element={<Messages />} />
                <Route path="/messages" element={<Inbox />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;