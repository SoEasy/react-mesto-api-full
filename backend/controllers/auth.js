const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { BadRequestError, UnauthorizedError } = require('../errors');

const signUpController = (req, res, next) => {
  const {
    name, email, password
  } = req.body;

  return bcrypt.hash(password, 10).then(
    (hash) => User.create({
      name, email, password: hash,
    })
  ).then(
    (user) => res.status(201).send({ data: user.toJSON() })
  ).catch(
    (err) => {
      if (err.code === 11000) {
        next(new BadRequestError('User already exists'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    }
  );
}

const signInController = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password).then(
    (user) => {

      const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
      res.cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: user.toJSON(), token });
    }
  ).catch(
    (err) => {
      next(new UnauthorizedError(err.message));
    }
  );
}

const meController = (req, res, next) => {
  return res.status(200).send({ id: req.user._id });
}

module.exports = {
  signInController,
  signUpController,
  meController
};
