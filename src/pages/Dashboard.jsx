import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // --- Step 1: Data mangwane wala function ---
  const fetchItems = async () => {
    try {
      const { data: itemsData } = await supabase.from("lost_found_items").select("*").order("id", { ascending: false });
      setItems(itemsData || []);

      const { data: compData } = await supabase.from("complaints").select("*");
      setComplaints(compData || []);

      const { data: volData } = await supabase.from("volunteers").select("*");
      setVolunteers(volData || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // --- Step 2: Realtime aur Initial Fetch (Dabbe ke andar) ---
  useEffect(() => {
    fetchItems(); // Page load pe data lao

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public' }, 
        (payload) => {
          console.log("Naya data aaya:", payload);
          toast.success("🚀 New Update! Portal par naya data add hua hai.", {
            duration: 3000,
            position: 'top-right',
          });
          fetchItems(); // Counts aur tables refresh karo
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Cleanup
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-dark shadow-sm py-2" style={{ backgroundColor: '#0057a8' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Saylani Logo" style={{ height: '60px', marginRight: '12px' }} />
            <span className="navbar-brand fw-bold mb-0 fs-4">Mass IT Hub</span>
          </div>
          <button className="btn btn-outline-light btn-sm px-3 fw-bold" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="fw-bold mb-4" style={{ color: '#66b032' }}>Welcome, Student! 🎓</h2>

        {/* Counts Section */}
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="p-3 bg-white border-start border-5 border-success shadow-sm rounded">
              <p className="text-muted mb-1 fw-bold">Total Lost & Found</p>
              <h2 className="fw-bold text-success">{items.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white border-start border-5 border-primary shadow-sm rounded">
              <p className="text-muted mb-1 fw-bold">Total Complaints</p>
              <h2 className="fw-bold text-primary">{complaints.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white border-start border-5 border-success shadow-sm rounded">
              <p className="text-muted mb-1 fw-bold">Total Volunteers</p>
              <h2 className="fw-bold text-success">{volunteers.length}</h2>
            </div>
          </div>
        </div>

        {/* Module Buttons */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0 h-100" style={{ borderTop: '4px solid #66b032' }}>
              <h4>🔍 Lost & Found</h4>
              <p>Post items you found or lost.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/LostFound")}>Open Module</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0 h-100" style={{ borderTop: '4px solid #0057a8' }}>
              <h4>📢 Complaints</h4>
              <p>Submit campus related issues.</p>
              <button className="btn btn-primary mt-auto" onClick={() => navigate("/Complaints")}>Submit Now</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0 h-100" style={{ borderTop: '4px solid #66b032' }}>
              <h4>🤝 Volunteer</h4>
              <p>Register for campus events.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/Volunteers")}>Join Now</button>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-5 card shadow-sm p-3 border-0">
          <h4 className="fw-bold" style={{ color: '#0057a8' }}>Recent Lost & Found Posts</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr><th>Item Name</th><th>Description</th><th>Status</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td><span className="badge bg-warning text-dark">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="mt-5 card shadow-sm p-3 border-0">
          <h4 className="fw-bold" style={{ color: '#0057a8' }}>Recent Complaints</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr><th>Category</th><th>Description</th><th>Status</th></tr>
              </thead>
              <tbody>
                {complaints.map((comp) => (
                  <tr key={comp.id}>
                    <td>{comp.category}</td>
                    <td>{comp.description}</td>
                    <td><span className="badge bg-info text-dark">{comp.status}</span></td>
                  </tr>
                ))}
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
