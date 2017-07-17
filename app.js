const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const Todo = require('./models/todos.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use('/static', express.static('static'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todomvc');
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

//Get todos
app.get ('/api/todos', function(req, res){
  Todo.getTodos(function(err, todos){
    if(err){
      throw err;
    }
    res.json(todos.map(function (todo) {
      return {
        id: todo._id,
        title: todo.title,
        order: todo.order,
        completed: todo.completed
      }
    }));
  });
});


//Add todos
app.post('/api/todos', function(req, res){
  var todo = req.body;
  Todo.addTodo(todo, function(err, todo){
    if(err){
      throw err;
    }
    res.json(todo);
  });
});


//Get Todo's by ID
app.get('/api/todos/:id', function(req, res){
  Todo.getTodoById(req.params.id, function(err, todo){
    if(err){
      throw err;
    }
    res.json(todos.map(function (todo) {
      return {
        id: todo._id,
        title: todo.title,
        order: todo.order,
        completed: todo.completed
      }
    }));
  });
});


//Update Todo's by ID
app.put('/api/todos/:id', function(req, res){
  var id = req.params.id
  var todo = req.body;
  Todo.updateTodo(id, todo, function(err, todo){
    if(err){
      throw err;
    }
    res.json(todos.map(function (todo) {
      return {
        id: todo._id,
        title: todo.title,
        order: todo.order,
        completed: todo.completed
      }
    }));
  });
});


//Deletes a Todo by ID
app.delete('/api/todos/:id', function(req, res){
  var id = req.params.id
  console.log("Your ID is " + id);
  Todo.removeTodo(id, function(err, todo){
    if(err){
      throw err;
    }
    res.json(todo);
  });
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
