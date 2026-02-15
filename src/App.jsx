import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LostFound from "./pages/LostFound";
import Complaints from "./pages/Complaints";
import Volunteers from "./pages/Volunteers";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/LostFound" element={<LostFound />} />
        <Route path="/Complaints" element={<Complaints />} />
        <Route path="/Volunteers" element={<Volunteers />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
