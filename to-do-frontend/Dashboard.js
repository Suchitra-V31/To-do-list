import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TaskTable from "./TaskTable";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [state, setState] = useState("");
  const [remarks, setRemarks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userId] = useState(() => localStorage.getItem("userId"));

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    if (state) {
      // Filter tasks based on the state
      const filtered = tasks.filter((task) => task.state === state);
      setFilteredTasks(filtered);
    } else {
      // If no state is selected, show all tasks
      setFilteredTasks(tasks);
    }
  }, [tasks, state]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/user/${userId}`);
      setTasks(response.data);
      setFilteredTasks(response.data); // Show all tasks initially
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateUpdateTask = async () => {
    const taskData = {
      userId,
      taskName,
      startDate,
      endDate,
      percentage,
      state,
      remarks,
    };

    try {
      if (isEditMode && taskId) {
        await axios.patch(`http://localhost:5000/tasks/${taskId}`, taskData);
      } else {
        await axios.post("http://localhost:5000/tasks", taskData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const handleDeleteTask = async (taskName) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskName}`);
      fetchTasks(); // Refresh task list
      alert("Task Deleted successfully!!!!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setTaskId(task._id);
    setTaskName(task.taskName);
    setStartDate(new Date(task.startDate));
    setEndDate(new Date(task.endDate));
    setPercentage(task.percentage);
    setState(task.state);
    setRemarks(task.remarks);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTaskId(null);
    setTaskName("");
    setStartDate(null);
    setEndDate(null);
    setPercentage(0);
    setState("");
    setRemarks("");
    setIsEditMode(false);
  };

  // Handle filtering by task state from sidebar
  const handleStateChange = (newState) => {
    setState(newState); // This will trigger the effect for filtering tasks
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f8ff" }}>
      <Sidebar setState={handleStateChange} />
      <div style={{ flex: 1, padding: "20px", background: "#f0f8ff" }}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCreateClick={() => setIsModalOpen(true)} />
        <TaskTable tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />

        <Modal show={isModalOpen} onHide={() => { setIsModalOpen(false); resetForm(); }} centered>
          <Modal.Header closeButton className={isEditMode ? "bg-warning text-white" : "bg-success text-white"}>
            <Modal.Title>{isEditMode ? "Update Task" : "Create Task"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="taskName" className="mb-3">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name"
                />
              </Form.Group>
              <Form.Group controlId="startDate" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  placeholderText="Select start date"
                />
              </Form.Group>
              <Form.Group controlId="endDate" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control"
                  placeholderText="Select end date"
                />
              </Form.Group>
              <Form.Group controlId="percentage" className="mb-3">
                <Form.Label>Completion (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  min="0"
                  max="100"
                />
              </Form.Group>
              <Form.Group controlId="state" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">-- Select Status --</option> {/* default placeholder */}
                  <option value="NEW">New</option>
                  <option value="IN-PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ON-HOLD">On Hold</option>
                </Form.Control>

              </Form.Group>
              <Form.Group controlId="remarks" className="mb-3">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={isEditMode ? "warning" : "success"} onClick={handleCreateUpdateTask}>
              {isEditMode ? "Update Task" : "Create Task"}
            </Button>
            <Button variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
