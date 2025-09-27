require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const homeRoute = require("./routes/index");
const connectDB = require("./config/mongodb");

connectDB();

// ✅ Use Routes
app.use("/", homeRoute);

// 404 Middleware
app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});

// 🔴 Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error: ${err.message}`);
}); 


app.listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
});