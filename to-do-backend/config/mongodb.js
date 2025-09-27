const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URL;    

const connectDB = async() =>{
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected!!!");
    }
    catch(e){
        console.log("MongoDB Connection Failed:", e.message);
        process.exit(1); 
    }
};

module.exports = connectDB;