import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

function Complaints() {
  const [category, setCategory] = useState("Internet"); // Default value pehli wali
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Supabase ki 'complaints' table mein data bhej rahe hain
    const { error } = await supabase
      .from('complaints')
      .insert([{ category, description, status: 'Submitted' }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Complaint Submitted Successfully! 📢");
      navigate("/Dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0" style={{borderTop: '5px solid #0057a8'}}>
        <h2 className="fw-bold mb-4" style={{color: '#0057a8'}}>📢 Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
              <option value="Internet">Internet</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Describe the Issue</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Masla tafseel se likhein..." 
              onChange={(e) => setDescription(e.target.value)} 
              required
            ></textarea>
          </div>
          <button className="btn btn-primary w-100 py-2 fw-bold" style={{backgroundColor: '#0057a8'}}>
            SUBMIT COMPLAINT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaints;
