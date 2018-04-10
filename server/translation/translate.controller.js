const translateService = require('./translate.service');
const speech = require('@google-cloud/speech');

module.exports = function(io) {
  let translateController = {};
  const client = new speech.SpeechClient();

  console.log('Setting up socket for translation');

  io.on('connection', function (socket) {
    socket.on('translateAudio', translateController.translate);
  });


  translateController.translate = async function(blob) {
    // Detects speech in the audio file
    client
      .recognize({audio: blob.blob})
      .then(data => {
        const response = data[0];
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        io.emit('translateResult', transcription);
        console.log(`Transcription: ${transcription}`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  };

  return translateController;

};
