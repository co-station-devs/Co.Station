exports.process = async function (params) {
    let reply = params;
    reply.message = 'I have no answers yet :(,\nyour message was: ' + params.message;
    reply.type = 0;

    return new Promise(resolve => {
        setTimeout(() => {
          resolve(reply);
        }, 2000);
      });;
}