const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./database/mongoose');
const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');
const port = 3000;


//to get data from front-end in JSON formate, backend will understand it through express
//so we nee to use express.json
app.use(express.json()); // or to use this thing we need thirst party body parser hence install it if json is not included in express but here we don't need it..

//CORS- cross origin request security, since express only allow to take backend request on local host 3000 for security reasons
//to allow to take request of frontend local host let 4200 as well we need third party feature to be installed. 
app.use(cors());

//Roues or Rest API Endpoints or Resful webservices Endpoints
/*
TaskList- Create, Update, ReadTaskListbyID, ReadAllTaskList
Task- Create, Update, ReadTaskById, ReadAllTask
*/

//Routes or API endpoint TaskList model
//Get All Task Lists
//http://localhost:3000/tasklists => [{TaskList},{TaskList}]
app.get('/tasklists', (req, res)=>{
    TaskList.find({})
        .then((lists)=> {res.status(200),res.send(lists)})
        .catch((error)=>{console.log("Error is: ", error)});
});

//Route or Endpoint for creating a TaskList
app.post('/tasklists',(req,res)=>{
    
    let taskListObj = {'title': req.body.title};
    TaskList(taskListObj).save()
    .then((lists)=> {
        res.status(201),
        res.send(lists);
        
    })
    .catch((error)=>{console.log("Error is: ", error)});
});

//Endpoint to get one taskList by taskListId: url/tasklists/:id
app.get('/tasklists/:tasklistId', (req,res)=>{
    let tasklistId = req.params.tasklistId;   //params->/ -> id part
    TaskList.find({_id:tasklistId})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=> {console.log(error)});
});


//Endpoint to update taskList by taskListId: url/taskLists/:id
app.put('/tasklists/:tasklistId', (req,res)=>{
    TaskList.findByIdAndUpdate({_id: req.params.tasklistId},{$set: req.body}, { new: true })
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=> {console.log(error)});
});


//Endpoint to delete a tasklist by taskListId
app.delete('/tasklists/:tasklistId', (req,res)=>{
    TaskList.findByIdAndDelete({_id: req.params.tasklistId})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=> {console.log(error)});
});


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server started on port ${port}!`));

