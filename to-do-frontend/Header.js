const Header = ({ searchTerm, setSearchTerm, onCreateClick }) => (
    <div
      className="d-flex justify-content-between align-items-center mb-4 p-3"
      style={{
        background: "linear-gradient(to right, #128C7E, #25D366)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        color: "#fff",
      }}
    >
      <h2 style={{ fontWeight: "bold", marginBottom: 0 }}>📅 Task Dashboard</h2>
  
      <div className="d-flex align-items-center" style={{ flex: 1, marginLeft: "20px", marginRight: "20px" }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{
            borderRadius: "12px",
            border: "none",
            padding: "10px 15px",
            boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
  
      <button
        className="btn"
        onClick={onCreateClick}
        style={{
          backgroundColor: "#075E54",
          color: "#fff",
          borderRadius: "12px",
          padding: "10px 20px",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#075E54")}
      >
        ➕ Create Task
      </button>
    </div>
  );
  
  export default Header;
  