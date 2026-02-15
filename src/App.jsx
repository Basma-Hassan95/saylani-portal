import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sabse pehle Signup dikhega */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard abhi baad mein banayenge */}
        <Route path="/dashboard" element={<div className="p-5 text-center"><h1>Welcome to Saylani Dashboard</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
