const express = require('express');
const chats = express.Router();

module.exports.chats = function (io) {
  const ChatController = require('./chat.controller')(io);

  /* GET chats listing. */
  chats.get('/', ChatController.list);

  chats.get('/:id', ChatController.read);

  chats.post('/', ChatController.create);
  chats.post('/check', ChatController.isChat);

  chats.put('/', ChatController.update);

  chats.delete('/:id', ChatController.del);


  return chats
};
