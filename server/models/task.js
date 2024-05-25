const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    description:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"]
    },
    duedate:{
        type:Date
    }
})

const tasks = mongoose.model("task",taskSchema);

module.exports = tasks;

