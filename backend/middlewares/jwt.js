const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const jwtGuard = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = jwtGuard;
