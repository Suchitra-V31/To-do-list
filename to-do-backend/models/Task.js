const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TaskSchema = new mongoose.Schema({
    taskName :{
        type:String,
        required : true
    },
    startDate :{
        type : Date,
        required : true
    },
    endDate :{
        type : Date,
        required : true
    },
    percentage :{
        type: Number,
        min:0,
        max: 100,
        required: true
    },
    state : {
        type: String,
        enum : ["NEW","IN-PROGRESS","COMPLETED","ON-HOLD"],
        required : true
    },
    remarks : {
        type : String
    },

    userId: { // from User model
        type: Number,
        required: true
    }

})

TaskSchema.plugin(AutoIncrement, { inc_field: 'taskId', start_seq: 1 });

const Task = mongoose.model("Task",TaskSchema);
module.exports = Task;