var mongoose = require('mongoose');

//todo Schema
var todoSchema = mongoose.Schema({
  title:{
    type: String,
  },
  completed:{
    type: Boolean,
  },
  order:{
    type: Number,
  }
});

var Todo = module.exports = mongoose.model('Todo', todoSchema);

//Get all todos
module.exports.getTodos = function(callback, limit){
  Todo.find(callback).limit(limit);
}

//Add a todos
module.exports.addTodo = function(todo, callback){
  Todo.create(todo, callback);
}

//Deletes Todo by Id
module.exports.removeTodo = function(id){
  // var query = {_id: id};
  Todo.findByIdAndRemove(id);
}

//Get Todo by Id
module.exports.getTodoById = function(id, callback){
  Todo.findById(id, callback);
}

//Update Todo by Id
module.exports.updateTodo = function(id, todo, options,callback){
  var query = {id: id};
  var update = {
    title: todo.title,
    completed: todo.completed,
    order: todo.order
  }
  Todo.findOneAndUpdate(query, update, options, callback);
}
