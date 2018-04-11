const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

exports.translate = async function(input) {
  const result = await client.recognize({
    audio: {
      content: input.blob
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'nl-BE',
      // languageCode: 'en-US'
    }
  }).catch(e => {
    console.error('Error transcripting audio', e);
  });

  const response = result[0];
  if (response.results.length < 0) {
    return null;
  }
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  return transcription;
};
