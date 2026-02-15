import { useEffect, useState } from "react"; // 👈 Ye 2 cheezein add ki
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

function Dashboard() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 👈 Data save karne ke liye

   
    useEffect(() => {
    fetchItems();
  }, []);

 
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("lost_found_items")
      .select("*")
      .order("id", { ascending: false }); // Naya item sab se upar

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setItems(data); // Tray (state) mein data bhar dia
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
                            {/* 👈 Rasta de diya */}
                            <button className="btn btn-success" onClick={() => navigate("/LostFound")}>
                                Open Module </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center border-0" style={{ borderTop: '4px solid #0057a8' }}>
                            <h4>📢 Complaints</h4>
                            <p>Submit campus related issues.</p>
                            <button className="btn btn-primary">Submit Now</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center border-0" style={{ borderTop: '4px solid #66b032' }}>
                            <h4>🤝 Volunteer</h4>
                            <p>Register for campus events.</p>
                            <button className="btn btn-success">Join Now</button>
                        </div>
                    </div>
                </div>

                {/* 🚀 NEW: Recent Items Table (Yahan dikhega ke kaam kar raha hai ya nahi) */}
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
            </div>
        </div>
    );
}

export default Dashboard;
