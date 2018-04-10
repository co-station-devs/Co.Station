exports.process = async function(params) {

  const projectId = 'timecreditagent';
  const translationProjectId = 'arcelormittal-hr-chatbot';
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
  // Translate input
  const translatedInput = await translate.translate(query, 'en');
  // Create request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: translatedInput[0],
        languageCode: languageCode
      }
    }
  };
  const intentResult = await sessionClient.detectIntent(request);
  // Get first result
  const firstIntentResult = intentResult[0].queryResult;

  console.log('Detected intent');
  console.log(`  Query: ${firstIntentResult.queryText}`);
  console.log(`  Response: ${firstIntentResult.fulfillmentText}`);
  console.log(firstIntentResult.intent ? `  Intent: ${firstIntentResult.intent.displayName}` : `  No intent matched.`);

// translate output back to nl
  const translatedOutput = await translate.translate(firstIntentResult.fulfillmentText, 'nl');


  // Prepare our response chat
  const result = {
    type: 0,
    user: params.user,
    message: translatedOutput[0],
    originalMessage: firstIntentResult.fulfillmentText,
    payload: JSON.stringify(firstIntentResult)
  };

  return result;
};
