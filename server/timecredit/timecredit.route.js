const express = require('express');
const timecredit = express.Router();
const TimeCreditService = require('./timecredit.service');

module.exports.timecredit = function(io) {
  const TimeCreditController = require('./timecredit.controller')(io);

  /* GET hrx listing. */
  timecredit.post('/find', TimeCreditController.find);
  timecredit.post('/seed', TimeCreditController.seed);

  return timecredit;
};
