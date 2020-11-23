const { getUsers } = require('./../fakeDB');

const getAllUsers = (req, res) => {
  res.status(200).send({ users: getUsers() });
};

module.exports = {
  getAllUsers
};
