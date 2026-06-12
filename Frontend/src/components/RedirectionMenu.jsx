import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Menu() {
  async function handleLogout() {
    try {
      await api.get("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value === "logout") {
      handleLogout();
      return;
    }
    navigate(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl outline-none hover:border-blue-500 transition"
    >
      <option value="" disabled>
        Go To
      </option>

      <option value="/">Home</option>

      <option value="/profile">Create Post</option>

      <option value="logout" onClick={handleLogout}>
        Logout
      </option>
    </select>
  );
}

export default Menu;
