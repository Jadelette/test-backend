const serverless = require('serverless-http');
const express = require('express');
const app = express();
//app.use(express.json());
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
  console.log("you posted this task: " + request.body.description);

  response.json({message: "You have posted a task."});
});




app.delete('/tasks/:taskId', function(request, response){
  const taskToBeDeleted = request.params.taskId;

  let someResponse = {
    message: 'You issued a delete request.' + taskToBeDeleted
  }; 

  if (taskToBeDeleted > 3) {
    response.status(404);
    someResponse = 'task not found';
  }
  response.json(someResponse);
});



module.exports.handler = serverless(app);
