const translateService = require('./speech.service');

module.exports = function(io) {
  let translateController = {};

  console.log('Setting up socket for speech');

  io.on('connection', function(socket) {
    socket.on('speech', translateController.translate);
  });


  translateController.translate = async function(blob) {
    try {
      const transcription = await translateService.translate(blob);
      io.emit('transcription', transcription);
    } catch (e) {
      console.error('Error transcripting audio', e);
      throw Error('Error transcripting audio');
    }

  };

  return translateController;

};
