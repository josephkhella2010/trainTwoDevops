import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import NavigationContainer from "../Navigation/NavigationContainer";
import RegisterPage from "../register/RegisterPage";
import { ToastContainer } from "react-toastify";
export default function RoutesPage() {
  return (
    <div>
      <Router>
        <ToastContainer />  
        <NavigationContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}
