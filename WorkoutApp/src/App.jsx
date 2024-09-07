import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home"; 
import 'bootstrap/dist/css/bootstrap.css';
import { CiUser, CiLock } from "react-icons/ci";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to SignIn */}
        <Route path="/" element={<Navigate to="/signin" />} />
        
        {/* SignIn Route */}
        <Route 
          path="/signin" 
          element={<SignIn UserLogo={CiUser} PswrdLogo={CiLock} />} 
        />
        
        {/* SignUp Route */}
        <Route 
          path="/signup" 
          element={<SignUp UserLogo={CiUser} PswrdLogo={CiLock} />} 
        />
        
        {/* Home Route */}
        <Route 
          path="/home" 
          element={<Home />} 
        />
      </Routes>
    </Router>
  );
}

export default App