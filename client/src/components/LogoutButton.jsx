import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
