
const Chat = require('./chat.model');
const ChatService = require('./chat.service');
const UserService = require('../user/user.service');
const HrxService = require('../hrx/hrx.service');
const AssistantService = require('../assistant/assistant.service');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(io) {
  let chatController = {};

  chatController.list = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    const filter = {
      page: req.query.page ? parseInt(req.query.page) + 1 : 1, // Front works 0 based, backend 1 based
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
      sort: req.query.sort ? {} : null,
      direction: req.query.direction ? req.query.direction : null
    };

    if (req.query.sort) {
      filter.sort[req.query.sort] = req.query.direction;
    }

    const query = {};
    // filter out chat for user
    if (req.query.user) {
      query.user = new ObjectId(req.query.user);
    }

    let beforeDate = req.query.date_created ? moment(req.query.date_created) : moment().subtract(10, 'm');

    query.date_created = {
      $gte: beforeDate.toDate()
    };

    try {
      const items = await ChatService.list(query, filter);

      // Return the list with the appropriate HTTP status Code and Message.

      return res.status(200).json({
        status: 200,
        data: items,
        message: `Succesfully Chats Recieved`
      });

    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({
        status: 400,
        message: e.message
      });

    }
  };

  chatController.create = async function(req, res, next) {

    // Req.Body contains the form submit values.
    try {


      // Calling the Service function with the new object from the Request Body
      const createdModel = await ChatService.create(req.body);
      io.emit(`chatAdded_${createdModel.user}`, createdModel);

      // Checking if users's HRX data is available
      const user = await UserService.read(createdModel.user);

      if (!user.hrx ) {
        user.hrx = await HrxService.find(`${user.firstName}, ${user.lastName}`);
        await UserService.update(user);
      }

      let serverAnswer;

      // Get assistant answer
      // TODO: Buffer assistant's replies
      io.emit('thinking', true);
      AssistantService.process(req.body).then(async r => {
        serverAnswer = await ChatService.create(r);
        io.emit(`chatAdded_${createdModel.user}`, serverAnswer);
        io.emit('thinking', false);
      });

      return res.status(201).json({
        status: 201,
        data: serverAnswer || createdModel,
        message: `Succesfully Created Chat`
      });
    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.
      return res.status(400).json({
        status: 400,
        message: `Chat Creation was Unsuccesfull`
      });
    }
  };

  chatController.read = async function(req, res, next) {

    const id = req.params.id;

    try {
      const item = await ChatService.read(id);
      return res.status(200).json({
        status: 200,
        data: item,
        message: `Succesfully Chat Recieved`
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  };

  chatController.update = async function(req, res, next) {
    // Id is necessary for the update

    if (!req.body._id) {
      return res.status(400).json({
        status: 400.,
        message: 'Id must be present'
      });
    }

    const id = req.body._id;

    try {
      const updatedChat = await ChatService.update(req.body);
      return res.status(200).json({
        status: 200,
        data: updatedChat,
        message: `Succesfully Updated Chat`
      });
    } catch (e) {
      return res.status(400).json({
        status: 400.,
        message: e.message
      });
    }
  };

  chatController.del = async function(req, res, next) {
    const id = req.params.id;

    try {
      const deleted = await ChatService.delete(id);
      return res.status(204).json({
        status: 204,
        message: `Succesfully Chat Deleted`
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  };

  return chatController;
};
