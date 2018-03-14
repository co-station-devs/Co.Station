const express = require('express');
const UserController = require('./user.controller');
const user = express.Router();

/* GET users listing. */
user.get('/', UserController.list);

user.get('/:id', UserController.read);

user.post('/', UserController.create);

user.put('/', UserController.update);

user.delete('/:id', UserController.del);


module.exports.users = user;

