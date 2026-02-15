import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

function LostFound() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    // Database mein data bhej rahe hain
    const { error } = await supabase
      .from('lost_found_items')
      .insert([{ title, description: desc, status: 'Pending' }]);

    if (error) alert(error.message);
    else {
      toast.success("Item Posted!")
      navigate("/Dashboard"); // Wapas dashboard pe jao data dekhne
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0" style={{borderTop: '5px solid #66b032'}}>
        <h3 className="text-success mb-4">🔍 Post Lost/Found Item</h3>
        <form onSubmit={handlePost}>
          <input className="form-control mb-3" placeholder="Item Name" onChange={(e) => setTitle(e.target.value)} required />
          <textarea className="form-control mb-3" placeholder="Description" onChange={(e) => setDesc(e.target.value)} required />
          <button className="btn btn-success w-100 py-2">SUBMIT POST</button>
        </form>
      </div>
    </div>
  );
}

export default LostFound;
