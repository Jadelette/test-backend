const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

  const tasks = [
    {
    id: 1,
    description: "task 1",
    done: false
  },
  {
    id: 2,
    description: "task 2",
    done: false
  },
  {
    id: 3,
    description: "task 3",
    done: false
  }
  ];
  response.json(tasks);
})

module.exports.handler = serverless(app);
