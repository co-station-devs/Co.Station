const TimeCreditService = require('./timecredit.service');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(io) {
  let timeCreditController = {};

  timeCreditController.find = async function(req, res, next) {

    const params = req.body;

    try {
      const item = await TimeCreditService.find(params);
      return res.status(200).json({
        status: 200,
        data: item,
        message: `Succesfully TimeCredit Recieved`
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  };

  return timeCreditController;
};
