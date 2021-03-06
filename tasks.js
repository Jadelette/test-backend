const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const dbService = require('./dbservice');

app.get('/tasks', function (request, response) {
  dbService.getTasks()
  .then(function(results){
    //we got the tasks ok
    response.json(results);
  })
  .catch(function(error){
    //something went wrong
    response.status(500);
    response.json(error);
  });
})


app.post('/tasks', function (request, response) {
  const description = request.body.description;
  const done = request.body.done;
  const status = request.body.status;
  const dueDate = request.body.dueDate;
  const userId = request.body.userId;

  dbService.saveTask(description, done, status, dueDate, userId).then(function(results){
    response.json(results);
  })
  .catch(function(error){
    response.status(500);
    response.json(error);
  });
})


app.delete('/tasks/:taskId', function(request, response){
  const taskToBeDeleted = request.params.taskId;

  dbService.deleteTask(taskToBeDeleted).then(function(results){
    response.json(results);
  })
  .catch(function(error){
    response.status(500);
    response.json(error);
  });
})


app.put('/tasks/:taskId', function(request, response){
  const taskToUpdate = request.params.taskId;
  const description = request.body.description;
  const done = request.body.done;
  const status = request.body.status;
  const dueDate = request.body.dueDate;
  const userId = request.body.userId;

  dbService.updateTask(taskToUpdate, description, done, status, dueDate, userId)
  .then(function(results){
    response.json(results);
  })
  .catch(function(error){
    response.status(500);
    response.json(error);
  });  
})


module.exports.handler = serverless(app);
