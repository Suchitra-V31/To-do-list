const TaskTable = ({ tasks, onEdit, onDelete }) => (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
        padding: "20px",
      }}
    >
      <table className="table table-hover">
        <thead style={{ backgroundColor: "#128C7E", color: "#fff" }}>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>%</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} style={{ verticalAlign: "middle" }}>
              <td>{task.taskName}</td>
              <td>{new Date(task.startDate).toLocaleDateString()}</td>
              <td>{new Date(task.endDate).toLocaleDateString()}</td>
              <td>
                <span
                  style={{
                    backgroundColor: "#25D366",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {task.percentage}%
                </span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: task.state === "Completed" ? "#28a745" : "#ffc107",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {task.state}
                </span>
              </td>
              <td>{task.remarks}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  onClick={() => onEdit(task)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  onClick={() => onDelete(task.taskName)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default TaskTable;
  