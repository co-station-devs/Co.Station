const express = require('express');
const ChatController = require('./chat.controller');
const chats = express.Router();

/* GET chats listing. */
chats.get('/', ChatController.list);

chats.get('/:id', ChatController.read);

chats.post('/', ChatController.create);

chats.put('/', ChatController.update);

chats.delete('/:id', ChatController.del);


module.exports.chats = chats;

