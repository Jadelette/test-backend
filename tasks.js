const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const dbService = require('./dbservice');

app.get('/tasks', function (request, response) {
  dbService.getTasks().then(function(tasks){
    //we got the tasks ok
    response.json(tasks);
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
    //we got the tasks ok
    response.json(results);
  })
  .catch(function(error){
    //something went wrong
    response.status(500);
    response.json(error);
  });
})


app.delete('/tasks/:taskId', function(request, response){
  const taskToBeDeleted = request.params.taskId;

  let someResponse = dbService.deleteTask(taskToBeDeleted);

  if (taskToBeDeleted > 3) {
    response.status(404);
    someResponse = 'task not found';
  }
  response.json(someResponse);
});



module.exports.handler = serverless(app);
