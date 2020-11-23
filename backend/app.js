require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const todoRoutes = require('./routes/todo.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todo', todoRoutes);

app.use((err, req, res, next) => {
  console.log('IN PROCESS ERROR');
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  return res.status(statusCode).send({ message });
});

app.use((req, res) => {
  console.log('IN 404');
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  auth: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
  authSource: 'admin'
}).then(() => {
  app.listen(PORT, () => {
    console.log(`I am listening to PORT ${PORT}`);
  });
});
