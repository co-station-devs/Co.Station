const express = require('express');
const hrx = express.Router();

module.exports.hrx = function (io) {
  const HrxController = require('./hrx.controller')(io);

  /* GET hrx listing. */
  hrx.get('/find/:name', HrxController.find);

  hrx.get('/:id', HrxController.read);

  hrx.post('/', HrxController.create);

  hrx.put('/', HrxController.update);

  hrx.delete('/:id', HrxController.del);


  return hrx
};
