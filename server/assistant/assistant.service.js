exports.process = async function (params) {

  const projectId = 'timecreditagent';
  const translationProjectId = 'arcelormittal-hr-chatbot'
  const sessionId = 'quickstart-session-id';
  const query = params.message;
  const languageCode = 'en-US';

  const dialogflow = require('dialogflow');

  // Imports the Google Cloud client library
  const Translate = require('@google-cloud/translate');

  // Instantiates a client
  let envTranslationApiKey = process.env.GOOGLE_API_TRANSLATION_CLIENT;
  const translate = new Translate({
    projectId: translationProjectId,
    key: process.env.GOOGLE_API_TRANSLATION_CLIENT
  });

  let sessionClient;
  // Check if dialogflow credentials are stored in system vars or heroku vars
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    sessionClient = new dialogflow.SessionsClient();
  } else {
    sessionClient = new dialogflow.SessionsClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL
      }
    });
  }

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  return translate
    .translate(query, 'en')
    .then(results => {
      const translation = results[0];
      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: translation,
            languageCode: languageCode,
          },
        },
      };

      // Send request and log result
      return sessionClient
        .detectIntent(request)
        .then(responses => {
          params.type = 0;
          console.log('Detected intent');
          const result = responses[0].queryResult;
          console.log(`  Query: ${result.queryText}`);
          console.log(`  Response: ${result.fulfillmentText}`);
          if (result.intent) {
            params.message = result.fulfillmentText;
            params.payload = result;
            console.log(`  Intent: ${result.intent.displayName}`);
          } else {
            console.log(`  No intent matched.`);
          }
          return params;
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });


}
