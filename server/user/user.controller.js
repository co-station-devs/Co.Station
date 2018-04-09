const User = require('./user.model');
const UserService = require('./user.service');


module.exports = function(io) {
  let userController = {};

  userController.list = async function(req, res, next) {

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

    // filter out basic
    const query = req.query.query ? { firstName: req.query.query } : {};


    try {

      const items = await UserService.list(query, filter);

      // Return the list with the appropriate HTTP Status Code and Message.

      return res.status(200).json({ status: 200, data: items, message: `Succesfully Users Recieved` });

    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({ status: 400, message: e.message });

    }
  };

  userController.create = async function(req, res, next) {

    // Req.Body contains the form submit values.
    try {

      // Calling the Service function with the new object from the Request Body
      const createdModel = await UserService.create(req.body);
      return res.status(201).json({ status: 201, data: createdModel, message: `Succesfully Created User` });
    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({ status: 400, message: `User Creation was Unsuccesfull` });
    }
  };

  userController.read = async function(req, res, next) {

    const id = req.params.id;

    try {
      const item = await UserService.read(id);
      return res.status(200).json({ status: 200, data: item, message: `Succesfully User Recieved` });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  userController.update = async function(req, res, next) {
    // Id is necessary for the update

    if (!req.body._id) {
      return res.status(400).json({ status: 400., message: 'Id must be present' });
    }

    const id = req.body._id;

    try {
      const updatedUser = await UserService.update(req.body);
      return res.status(200).json({ status: 200, data: updatedUser, message: `Succesfully Updated User` });
    } catch (e) {
      return res.status(400).json({ status: 400., message: e.message });
    }
  };

  userController.del = async function(req, res, next) {
    const id = req.params.id;

    try {
      const deleted = await UserService.delete(id);
      return res.status(204).json({ status: 204, message: `Succesfully User Deleted` });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  return userController;
};
