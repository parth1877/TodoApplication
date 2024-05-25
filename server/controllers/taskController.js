const tasks = require("../models/task");


const getAlltasks = async (req,res)=>{
    try {
        const alltasks = await tasks.find({});

        

        return res.status(200).json({
            success:true,
            alltasks
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false
        })
    }
}

const createTask = async (req,res) =>{
    try {
        const {title,description,status,duedate} = req.body;

        const getTitle = await tasks.findOne({title})
        

        if(getTitle){
            return res.status(409).json({
                success:false,
                message:"Title already exists"
            })
        }

        if(title=="" || description=="" || status=="" || duedate==""){
            return res.status(201).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        const tsk = await tasks.create({
            title:title,
            description:description,
            status:status,
            duedate:duedate
        })

        

        return res.status(200).json({
            success:true,
            message:"Task created successfully",
            tsk
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false
        })
    }
}

const getTask = async(req,res)=>{
    try {
        const id = req.params.id;

        const task = await tasks.findById(id);

        if(!task){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }

        return res.status(200).json({
            success:true,
            task
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false
        })
    }
}

const updateTask = async (req,res)=>{
    try {
        const {title,description,status,duedate} = req.body;
        const obj = {}
        const id = req.params.id

        
        const task = await tasks.findById(id);

        

        if(!task){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }

        // const getTitle = await tasks.findOne({title})
        

        // if(getTitle){
        //     return res.status(409).json({
        //         success:false,
        //         message:"Title already exists"
        //     })
        // }

        if(title){
            obj.title = title
        }
        if(description){
            obj.description = description
        }
        if(status){
            obj.status = status
        }
        if(duedate){
            obj.duedate = duedate
        }
        

        const updateTask = await tasks.findByIdAndUpdate(id,obj)

        
        

        return res.status(200).json({
            success:true,
            message:"Task updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false
        })
    }
}

const deleteTask = async (req,res)=>{
    try {
        const id = req.params.id

        const task = await tasks.findById(id);

        if(!task){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }

        

        await tasks.findByIdAndDelete(id);
        
        return res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false
        })
    }
}

module.exports =  {getAlltasks,createTask,deleteTask,updateTask,getTask}

