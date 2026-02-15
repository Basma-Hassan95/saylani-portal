import { useState } from "react";
import { supabase } from "../supabase/supabase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Check email.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>

      <input
        className="form-control mb-2"
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;
