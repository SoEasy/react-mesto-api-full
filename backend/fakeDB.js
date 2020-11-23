const users = new Array(Math.round(Math.random()*20)).fill(0).map((_, i) => ({
  id: i,
  name: `User${i}`,
  email: `user${i}@mail.ru`
}));

const todos = users.reduce((acc, { id }) => {
  acc[id] = new Array(Math.round(Math.random()* 10)).fill(0).map((_, i) => ({
    title: `Task${i}`,
    isDone: Math.random() > 0.5
  }));
  return acc;
}, {});

function addTodo(userId, title) {
  if (!todos[userId]) {
    todos[userId] = [];
  }
  todos[userId].push({ title, isDone: false });
}

function getTodos() {
  return todos;
}
function getUsers() {
  return users;
}

module.exports = {
  getTodos,
  getUsers,
  addTodo
}
