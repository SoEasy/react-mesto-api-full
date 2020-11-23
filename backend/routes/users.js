const router = require('express').Router();
const {
  getAllUsers
} = require('../controllers/users.js');

router.get('/', getAllUsers);

module.exports = router;
