exports.process = async function (params) {

  const projectId = 'timecreditagent';
  const sessionId = 'quickstart-session-id';
  const query = params.message;
  const languageCode = 'en-US';
  // let reply = params;
  // reply.message = 'I have no answers yet :(,\nyour message was: ' + params.message;
  // reply.type = 0;
  // Instantiate a DialogFlow client.
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
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      return result;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });


  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(reply);
  //   }, 2000);
  // });;
}
