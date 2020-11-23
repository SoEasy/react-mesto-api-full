const router = require('express').Router();
const {
  getUserTodos,
  createTodo,
} = require('../controllers/todo.js');

router.get('/:userId', getUserTodos);
router.post('/:userId', createTodo);

module.exports = router;
