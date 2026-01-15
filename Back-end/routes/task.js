const express= require('express');
const router =express.Router();
const TaskController = require('../controllers/TaskController')
const auth = require('../middleware/auth');
router.post('/tasks',auth,(req,res)=>{
  TaskController.addTask(req,res)
})
router.get('/tasks',auth,(req,res)=>{
  TaskController.getTasks(req,res)
})
router.delete('/tasks/:id',auth,(req,res)=>{
  TaskController.deleteTask(req,res)
})
router.put('/tasks/:id',auth,(req,res)=>{
  TaskController.updateTask(req,res)
})
router.put("/tasks/mark-all-completed",auth,
  TaskController.markAllCompleted)
module.exports=router;