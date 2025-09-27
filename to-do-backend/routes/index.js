const express = require("express");
const router = express.Router();
const task = require("../controller/TaskController");
const user = require("../controller/UserController");

// 🔹 Users Routes
router.get("/users", user.getAllUsers);
router.post("/users", user.createUser);
router.post("/login",user.loginUser);
router.patch("/users/:userName", user.updateUserByName);
router.delete("/users/:userName", user.deleteUserByName);

// 🔹 Tasks Routes
router.get("/tasks", task.getAllTasks);
router.post("/tasks", task.createTask);
router.get("/tasks/state/:state", task.getTaskAtState);
router.get("/tasks/user/:userId", task.getTasksForUser);
router.patch("/tasks/:id", task.updateTask);
router.delete("/tasks/:taskName", task.deleteTask);

module.exports = router;
