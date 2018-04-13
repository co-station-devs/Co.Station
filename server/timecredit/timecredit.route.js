const express = require('express');
const timecredit = express.Router();
const TimeCreditService = require('./timecredit.service');

module.exports.timecredit = function(io) {
  const TimeCreditController = require('./timecredit.controller')(io);


  // TimeCreditService.initial();

  /* GET hrx listing. */
  timecredit.post('/find', TimeCreditController.find);

  return timecredit;
};
