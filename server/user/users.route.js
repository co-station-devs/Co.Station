const express = require('express');
const user = express.Router();

module.exports.users = function(io) {
  const UserController = require('./user.controller')(io);
  /* GET users listing. */
  user.get('/', UserController.list);

  user.get('/:id', UserController.read);

  user.post('/', UserController.create);

  user.put('/', UserController.update);

  user.delete('/:id', UserController.del);

  return user;
};

