const Chat = require('./chat.model');
const ignoredValues = ['date_created', 'date_modified', '_id'];

exports.list = async function(query, params) {
  // Options setup for the mongoose paginate
  const options = {
    page: params.page,
    limit: params.limit,
    sort: params.sort
  };

  // Try Catch the awaited promise to handle the error
  return await Chat.paginate(query, options);
};

exports.create = async function(chat) {
  // Creating a new Mongoose Object by using the new keyword
  const newModel = new Chat(chat);
  newModel.date_created = new Date();

  // Saving the Chat
  return await newModel.save();
};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  return await Chat.findOne({ _id: id });

};

exports.update = async function update(chat) {
  const id = chat._id;
  let oldModel;

  oldModel = await Chat.findById(id);

  // If no old Chat Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel.email = chat.email;
  oldModel.firstName = chat.firstName;
  oldModel.lastName = chat.lastName;

  oldModel.date_modified = new Date();
  return await oldModel.save();

};


exports.del = async function(id) {

  const deleted = await Chat.remove({ _id: id });

  if (deleted.result.n === 0) {
    throw Error('Chat Could not be deleted');
  }
};




