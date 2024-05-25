

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController")


router.get("/tasks/getAlltasks",taskController.getAlltasks)
router.post("/tasks/createTask",taskController.createTask)
router.put("/tasks/updateTask/:id",taskController.updateTask)
router.delete("/tasks/deleteTask/:id",taskController.deleteTask)
router.get("/tasks/getTask/:id",taskController.getTask)


module.exports = router
