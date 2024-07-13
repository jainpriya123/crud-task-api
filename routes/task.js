const  express = require('express');
const  router = express.Router();
const Task = require('../database/models/task.js');

// Endpoint to get all tasks for a list
router.get('/:tasklistId/tasks', (req, res)=>{
    let tasklistId = req.params.tasklistId;
    Task.find({_tasklistId :tasklistId})
    .then((Tasks)=>{
        res.status(200).send(Tasks);
    })
    .catch((error)=>{console.log(error)});
});

//Endpoint to get add tasks for any list by taskListId
router.post('/:tasklistId/tasks',(req,res)=>{
    let title= req.body.title;
    let taskList = req.params.tasklistId;

    let taskObject= {'title': title, '_tasklistId': taskList};

    Task(taskObject).save()
    .then((taskCreated)=>{
        res.status(201).send(taskCreated);
    })
    .catch((error)=>{console.log(error), res.status(500);});
})


//Endpoint to get one task using its task id 
router.get('/:tasklistId/tasks/:taskId',(req,res)=>{
    let taskId = req.params.taskId;
    Task.findOne({_tasklistId: req.params.tasklistId, _id:taskId})
    .then((Tasks)=>{
        res.status(200).send(Tasks);
    })
    .catch((error)=>{console.log(error)});
})


//Endpoint to update one task using its task ID.
router.patch('/:tasklistId/tasks/:taskId', (req,res)=>{
    Task.findOneAndUpdate({_tasklistId: req.params.tasklistId, _id: req.params.taskId},{$set: req.body}, { new: true })
    .then((taskUpdated)=>{
        res.status(200).send(taskUpdated)
    })
    .catch((error)=> {console.log(error)});
});


//Endpoint to delete one task using its task ID.
router.delete('/:tasklistId/tasks/:taskId', (req,res)=>{
    Task.findOneAndDelete({_tasklistId: req.params.tasklistId, _id: req.params.taskId})
    .then((taskDeleted)=>{
        res.status(200).send(taskDeleted)
    })
    .catch((error)=> {console.log(error)});
});




module.exports = router;
// module.exports= deleteAllContainingTask;