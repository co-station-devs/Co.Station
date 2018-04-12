const speech = require('@google-cloud/speech');

let client;
// Instantiates a client
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  client = new speech.SpeechClient();
} else {
  client = new speech.SpeechClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
  });
}

exports.transcript = async function(blob) {
  const result = await client.recognize({
    audio: {
      content: blob
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
  if (!result) {
    return null;
  }
  const response = result[0];
  if (response.results.length < 0) {
    return null;
  }
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  return transcription;
};
