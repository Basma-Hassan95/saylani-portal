import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function Dashboard() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]); 
    const [complaints, setComplaints] = useState([]); 
    const [volunteers, setVolunteers] = useState([]);


   
    useEffect(() => {
    fetchItems();
  }, []);

 
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("lost_found_items")
      .select("*")
      .order("id", { ascending: false }); 

        const { data: compData } = await supabase.from("complaints").select("*");
  setComplaints(compData || []);
  
  const { data: volData } = await supabase.from("volunteers").select("*");
setVolunteers(volData || []);


    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setItems(data); 
    }
  };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-dark shadow" style={{ backgroundColor: '#0057a8' }}>
                <div className="container">
                    <span className="navbar-brand fw-bold">Saylani Mass IT Portal</span>
                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="container mt-4">
                <h2 className="fw-bold mb-4" style={{ color: '#66b032' }}>Welcome, Student! 🎓</h2>

                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center border-0" style={{ borderTop: '4px solid #66b032' }}>
                            <h4>🔍 Lost & Found</h4>
                            <p>Post items you found or lost.</p>
                           
                            <button className="btn btn-success" onClick={() => navigate("/LostFound")}>
                                Open Module </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center border-0" style={{ borderTop: '4px solid #0057a8' }}>
                            <h4>📢 Complaints</h4>
                            <p>Submit campus related issues.</p>
                            <button className="btn btn-primary" onClick={() => navigate("/Complaints")}>Submit Now</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center border-0" style={{ borderTop: '4px solid #66b032' }}>
                            <h4>🤝 Volunteer</h4>
                            <p>Register for campus events.</p>
                            <button className="btn btn-success" onClick={() => navigate("/Volunteers")} >Join Now </button>
                        </div>
                    </div>
                </div>

                {/*Items Table */}
                <div className="mt-5">
                    <h4 className="fw-bold text-saylani-blue" style={{ color: '#0057a8' }}>Recent Lost & Found Posts</h4>
                    <div className="table-responsive bg-white shadow-sm p-3 rounded">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        {/* AI ne item_name kaha tha, lekin aap 'title' likhenge kyunki database mein yahi hai */}
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <span className="badge bg-warning text-dark">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/*  Complaints Table */}
<div className="mt-5">
  <h4 className="fw-bold" style={{ color: '#0057a8' }}>Recent Complaints</h4>
  <div className="table-responsive bg-white shadow-sm p-3 rounded">
    <table className="table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {complaints.length > 0 ? (
          complaints.map((comp) => (
            <tr key={comp.id}>
              <td>{comp.category}</td>
              <td>{comp.description}</td>
              <td>
                <span className="badge bg-info text-dark">{comp.status}</span>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="3" className="text-center text-muted">Abhi tak koi complaint nahi hai.</td></tr>
        )}
      </tbody>
    </table>
  </div>
</div>

{/* Volunteer Table */}
<div className="mt-5 mb-5">
  <h4 className="fw-bold" style={{ color: '#66b032' }}>Recent Volunteer Registrations</h4>
  <div className="table-responsive bg-white shadow-sm p-3 rounded">
    <table className="table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Skill</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {volunteers.length > 0 ? (
          volunteers.map((vol) => (
            <tr key={vol.id}>
              <td>{vol.full_name}</td>
              <td>{vol.skill}</td>
              <td>{vol.phone}</td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="3" className="text-center text-muted">Koi volunteer nahi mila.</td></tr>
        )}
      </tbody>
    </table>
  </div>
</div>


            </div>
        </div>
    );
}

export default Dashboard;
