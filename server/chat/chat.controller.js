const Chat = require('./chat.model');
const ChatService = require('./chat.service');

exports.list = async function (req, res, next) {

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
    query.user = req.query.user
  }

  try {

    const items = await ChatService.list(query, filter);

    // Return the list with the appropriate HTTP Status Code and Message.

    return res.status(200).json({status: 200, data: items, message: `Succesfully Chats Recieved`});

  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({status: 400, message: e.message});

  }
};

exports.create = async function (req, res, next) {

  // Req.Body contains the form submit values.
  try {

    // Calling the Service function with the new object from the Request Body
    const createdModel = await ChatService.create(req.body);
    return res.status(201).json({status: 201, data: createdModel, message: `Succesfully Created Chat`})
  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({status: 400, message: `Chat Creation was Unsuccesfull`})
  }
};

exports.read = async function (req, res, next) {

  const id = req.params.id;

  try {
    const item = await ChatService.read(id);
    return res.status(200).json({status: 200, data: item, message: `Succesfully Chat Recieved`})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};

exports.update = async function (req, res, next) {
  // Id is necessary for the update

  if (!req.body._id) {
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  const id = req.body._id;

  try {
    const updatedChat = await ChatService.update(req.body);
    return res.status(200).json({status: 200, data: updatedChat, message: `Succesfully Updated Chat`})
  } catch (e) {
    return res.status(400).json({status: 400., message: e.message})
  }
};

exports.del = async function (req, res, next) {
  const id = req.params.id;

  try {
    const deleted = await ChatService.delete(id);
    return res.status(204).json({status: 204, message: `Succesfully Chat Deleted`})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};
