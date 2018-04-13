const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

let translate;
// Instantiates a client
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  translate = new Translate();
} else {
  translate = new Translate({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
  });
}

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

const sessionBase = sessionClient.sessionPath(process.env.GOOGLE_PROJECT_ID, sessionId);

exports.process = async function(query, userId, userLang) {
// Define session path
  const sessionPath = `${sessionBase}-${userId}`;

  // Translate input

  const translatedInput = await translate.translate(query, { to: 'en', from: userLang });
  console.log(`Translating ${query}(${userLang}) to ${JSON.stringify(translatedInput)}`);


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
  console.log(`  Response: ${firstIntentResult.fulfillmentText} - ${sessionPath}`);
  console.log(firstIntentResult.intent ? `  Intent: ${firstIntentResult.intent.displayName}` : `  No intent matched.`);

// translate output back to nl
  const translatedOutput = await translate.translate(firstIntentResult.fulfillmentText, 'nl');


  // Prepare our response chat
  const result = {
    type: 0,
    user: userId,
    message: translatedOutput[0],
    originalMessage: firstIntentResult.fulfillmentText,
    payload: JSON.stringify(firstIntentResult)
  };

  return result;
};
