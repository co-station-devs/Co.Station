const Hrx = require('./hrx.model');
const HrxService = require('./hrx.service');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (io) {
  let hrxController = {};

  hrxController.find = async function (req, res, next) {

    const name = req.params.name;

    try {
      const item = await HrxService.find(name);
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
