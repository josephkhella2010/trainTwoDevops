import { useNavigate } from "react-router-dom";

export default function NavigationContainer() {
  const navigate = useNavigate();
  const navFunction = (name: string) => {
    if (name === "home") {
      navigate("/");
    }
    if (name === "register") {
      navigate("/register");
    }
    if (name === "login") {
      navigate("/login");
    }
  };
  return (
    <div>
      <ul>
        <li onClick={() => navFunction("home")}>Home</li>
        <li onClick={() => navFunction("register")}>Register</li>
        <li onClick={() => navFunction("login")}>Login</li>
      </ul>
    </div>
  );
}
