const router = require('express').Router();
const jwtGuard = require('./../middlewares/jwt')

const {
  signUpController,
  signInController,
  meController
} = require('../controllers/auth.js');

router.post('/signUp', signUpController);
router.post('/signIn', signInController);
router.get('/me', jwtGuard, meController);

module.exports = router;
