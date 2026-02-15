import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert("Account Created! Directing to Login...");
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{backgroundColor: '#f8f9fa'}}>
      <div className="card shadow-lg p-4" style={{width: '100%', maxWidth: '400px', borderTop: '5px solid #66b032'}}>
        <div className="text-center mb-4">
          {/* Saylani Logo Placeholder */}
          <h3 className="text-saylani-blue fw-bold">SAYLANI</h3>
          <p className="text-muted small">Mass IT Hub Portal</p>
        </div>
        <h4 className="text-center mb-4">Create Account</h4>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="*******" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-saylani w-100 py-2 fw-bold">SIGN UP</button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login" style={{color: '#0057a8'}}>Login Here</Link></small>
        </div>
      </div>
    </div>
  );
}

export default Signup;
