const speechService = require('./speech.service');

module.exports = function(io) {
  let speechController = {};
  let activeSpeaking = [];

  console.log('Setting up socket for speech');

  io.on('connection', function(socket) {
    socket.on('start_speech', startSpeech);
    socket.on('stop_speech', stopSpeech);

    function startSpeech(data) {
      console.info(`Starting speech on: speech_${data.User.Model}_${data.session}`);
      socket.on(`speech_${data.user}_${data.session}`, speechController.transcript);
    }

    function stopSpeech(userId) {
      // console.log(activeSpeaking, userId);
      // activeSpeaking[userId] ()
    }
  });


  speechController.transcript = async function(input) {
    try {
      const transcription = await speechService.transcript(input.blob);
      io.emit(`transcription_${input.data.user}_${input.data.session}`, transcription);
    } catch (e) {
      console.error('Error transcripting audio', e);
      throw Error('Error transcripting audio');
    }

  };

  return speechController;

};
