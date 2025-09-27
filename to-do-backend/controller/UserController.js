const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {    
    try {
        const { userName, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ userName, email, password: hashedPassword });
        
        await newUser.save();
        res.json({ message: "User saved successfully!", user: newUser });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: {
              id: user.userId, 
              name: user.userName,
              email: user.email
            }
          });
          
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "No users found!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserByName = async (req, res) => {
    const userName = req.params.userName;
    try {
        const updatedUser = await User.findOneAndUpdate({ userName }, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const deleteUserByName = async (req, res) => {
    const userName = req.params.userName;
    try {
        await User.findOneAndDelete({ userName });
        res.status(200).json({ message: "User deleted Successfully!!!" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateUserByName,
    deleteUserByName
};