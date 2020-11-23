const Todo = require('../models/todo');
const { getTodos, addTodo } = require('./../fakeDB');

const getUserTodos = (req, res) => {
  const { userId } = req.params;
  res.status(200).send({ todos: getTodos()[userId] });
};

const createTodo = (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;
  addTodo(userId, title);
  res.status(200).send({ todos: getTodos()[userId] });
};

module.exports = {
  getUserTodos,
  createTodo,
};
