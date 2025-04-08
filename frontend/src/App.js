import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./api/ProtectedRoute";
import BasketPage from "./pages/BasketPage";
import './css/main.css';

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/basket" element={<BasketPage />}/>
          <Route path="/dashboard" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
    );
};

export default App;