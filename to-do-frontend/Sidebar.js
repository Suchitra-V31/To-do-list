import React from "react";
import { FaTasks, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const Sidebar = ({ setState, currentUser, setUsername }) => {
  const navigate = useNavigate();

  const handleStateChange = (newState) => {
    setState(newState); // Pass the selected state to the parent (Dashboard)
  };

  const handleLogout = () => {
    // Clear user session data if needed
    localStorage.removeItem("user"); // Remove user info from localStorage (if stored there)
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div
      style={{
        width: "240px",
        background: "linear-gradient(to bottom right, #25D366, #128C7E)",
        color: "#fff",
        padding: "30px 20px",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      <h3 style={{ marginBottom: "30px", fontWeight: "bold", textAlign: "center" }}>
        📝 My Tasks
      </h3>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "16px" }}>
        <li
          style={navItemStyle}
          onClick={() => handleStateChange("")} // All tasks
          onMouseOver={(e) => (e.currentTarget.style.background = "#34B7F1")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaTasks style={{ marginRight: "10px" }} />
          All Tasks
        </li>
        <li
          style={navItemStyle}
          onClick={() => handleStateChange("IN-PROGRESS")} // Pending & In Progress
          onMouseOver={(e) => (e.currentTarget.style.background = "#FFBD44")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaHourglassHalf style={{ marginRight: "10px" }} />
          Pending / In Progress
        </li>
        <li
          style={navItemStyle}
          onClick={() => handleStateChange("COMPLETED")} // Completed
          onMouseOver={(e) => (e.currentTarget.style.background = "#00C851")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaCheckCircle style={{ marginRight: "10px" }} />
          Completed
        </li>
      </ul>

      {/* User info and logout section */}
      <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #fff" }}>
        <div style={{ marginBottom: "15px", color: "#fff", fontSize: "18px" }}>
        </div>
        <Button variant="danger" onClick={handleLogout} style={{ width: "100%" }}>
          Logout
        </Button>
      </div>


    </div>
  );
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "background 0.3s ease",
  marginBottom: "15px",
};

export default Sidebar;
