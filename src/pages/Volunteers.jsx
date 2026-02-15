import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

function Volunteers() {
  const [fullName, setFullName] = useState("");
  const [skill, setSkill] = useState("Event Management");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Database (volunteers table) mein data bhej rahe hain
    const { error } = await supabase
      .from('volunteers')
      .insert([{ full_name: fullName, skill: skill, phone: phone }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
        toast.success("Registered as Volunteer")
      navigate("/Dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0" style={{borderTop: '5px solid #66b032'}}>
        <h2 className="fw-bold mb-4" style={{color: '#66b032'}}>🤝 Volunteer Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Your Full Name" 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Select Your Skill</label>
            <select className="form-select" onChange={(e) => setSkill(e.target.value)}>
              <option value="Event Management">Event Management</option>
              <option value="Teaching">Teaching</option>
              <option value="Social Work">Social Work</option>
              <option value="Technical Support">Technical Support</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="03xx-xxxxxxx" 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <button className="btn btn-success w-100 py-2 fw-bold" style={{backgroundColor: '#66b032'}}>
            JOIN NOW
          </button>
        </form>
      </div>
    </div>
  );
}

export default Volunteers;
