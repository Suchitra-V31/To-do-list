const Task = require("../models/Task");
const User = require("../models/Users")
const { sendTaskNotification } = require('../utils/mailer');

const createTask = async (req, res) => {
    try {
        const { userId, taskName, startDate, endDate, percentage, state, remarks } = req.body;
        const newTask = new Task({ userId, taskName, startDate, endDate, percentage, state, remarks });
        await newTask.save();
        
        const user = await User.findOne({userId:userId});
        if(!user){
            return res.json(400).json({"message": "User not Found!!!"});
        }

        await sendTaskNotification(user.email,taskName)
        res.json({ message: "New Task created!", task: newTask });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length > 0) {
            res.status(200).json({ status: "success", tasks });
        } else {
            res.status(404).json({ status: "failure", message: "No Tasks Found!!" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const deleteTask = async (req, res) => {
    const taskName = req.params.taskName;
    try {
        await Task.findOneAndDelete({ taskName });
        res.status(200).json({ message: "Task deleted Successfully!!!" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ status: "success", message: "Task Updated Successfully", updatedTask: task });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const getTaskAtState = async (req, res) => {
    const state = req.params.state;
    try {
        const tasks = await Task.find({ state });
        res.status(200).json({ status: "success", tasks });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const getTasksForUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTaskAtState,
    getTasksForUser
};