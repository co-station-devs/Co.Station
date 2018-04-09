const Hrx = require('./hrx.model');
const HrxService = require('./hrx.service');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (io) {
  let hrxController = {};

  hrxController.list = async function (req, res, next) {

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
    // filter out hrx for user
    if (req.query.user) {
      query.user = new ObjectId(req.query.user);
    }

    let beforeDate = req.query.date_created ?  moment(req.query.date_created) :moment().subtract(10, 'm');

    query.date_created = {
      $gte: beforeDate.toDate()
    };

    try {
      const items = await HrxService.list(query, filter);

      // Return the list with the appropriate HTTP Status Code and Message.

      return res.status(200).json({
        status: 200,
        data: items,
        message: `Succesfully Hrxs Recieved`
      });

    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({
        status: 400,
        message: e.message
      });

    }
  };

  hrxController.create = async function (req, res, next) {

    // Req.Body contains the form submit values.
    try {


      // Calling the Service function with the new object from the Request Body
      const createdModel = await HrxService.create(req.body);
      io.emit(`hrxAdded_${createdModel.user}`, createdModel);

      return res.status(201).json({
        status: 201,
        data: createdModel,
        message: `Succesfully Created Hrx`
      })
    } catch (e) {

      //Return an Error Response Message with Code and the Error Message.
      return res.status(400).json({
        status: 400,
        message: `Hrx Creation was Unsuccesfull`
      })
    }
  };

  hrxController.read = async function (req, res, next) {

    const id = req.params.id;

    try {
      const item = await HrxService.read(id);
      return res.status(200).json({
        status: 200,
        data: item,
        message: `Succesfully Hrx Recieved`
      })
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      })
    }
  };

  hrxController.update = async function (req, res, next) {
    // Id is necessary for the update

    if (!req.body._id) {
      return res.status(400).json({
        status: 400.,
        message: "Id must be present"
      })
    }

    const id = req.body._id;

    try {
      const updatedHrx = await HrxService.update(req.body);
      return res.status(200).json({
        status: 200,
        data: updatedHrx,
        message: `Succesfully Updated Hrx`
      })
    } catch (e) {
      return res.status(400).json({
        status: 400.,
        message: e.message
      })
    }
  };

  hrxController.del = async function (req, res, next) {
    const id = req.params.id;

    try {
      const deleted = await HrxService.delete(id);
      return res.status(204).json({
        status: 204,
        message: `Succesfully Hrx Deleted`
      })
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      })
    }
  };

  return hrxController
}
