exports.process = async function (params) {

  const projectId = 'timecreditagent';
  const sessionId = 'quickstart-session-id';
  const query = params.message;
  const languageCode = 'en-US';
  const dialogflow = require('dialogflow');
  const sessionClient = new dialogflow.SessionsClient();

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
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
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      return params;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
