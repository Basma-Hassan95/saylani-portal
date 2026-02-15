import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar - Saylani Blue */}
      <nav className="navbar navbar-dark shadow" style={{backgroundColor: '#0057a8'}}>
        <div className="container">
          <span className="navbar-brand fw-bold">Saylani Mass IT Portal</span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-saylani-green fw-bold mb-4" style={{color: '#66b032'}}>Welcome, Student! 🎓</h2>
        
        {/* Buttons for Modules */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0" style={{borderTop: '4px solid #66b032'}}>
              <h4>🔍 Lost & Found</h4>
              <p>Post items you found or lost.</p>
              <button className="btn btn-success">Open Module</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0" style={{borderTop: '4px solid #0057a8'}}>
              <h4>📢 Complaints</h4>
              <p>Submit campus related issues.</p>
              <button className="btn btn-primary">Submit Now</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center border-0" style={{borderTop: '4px solid #66b032'}}>
              <h4>🤝 Volunteer</h4>
              <p>Register for campus events.</p>
              <button className="btn btn-success">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
