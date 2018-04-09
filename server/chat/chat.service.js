const Chat = require('./chat.model');
const ignoredValues = ['date_created', 'date_modified', '_id'];

exports.list = async function (query, params) {
  // Options setup for the mongoose paginate
  const options = {
    page: params.page,
    limit: params.limit,
    sort: params.sort
  };

  // Try Catch the awaited promise to handle the error

  try {
    return await Chat.paginate(query, options);
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Chats')
  }
};

exports.create = async function (chat) {

  // Creating a new Mongoose Object by using the new keyword
  const newModel = new Chat(chat);
  newModel.date_created = new Date();

  try {
    // Saving the Chat
    return await newModel.save();

  } catch (e) {

    // return a Error message describing the reason
    throw Error("Error while Creating Chat")
  }
};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  try {
    return await Chat.findOne({_id: id});
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Chats')
  }
};

exports.update = async function update(chat) {
  const id = chat._id;
  let oldModel;

  try {
    //Find the old Chat Object by the Id
    oldModel = await Chat.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Chat")
  }

  // If no old Chat Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel.email = chat.email;
  oldModel.firstName = chat.firstName;
  oldModel.lastName = chat.lastName;

  oldModel.date_modified = new Date();

  try {
    return await oldModel.save();
  } catch (e) {
    throw Error("And Error occured while updating the Chat");
  }
};


exports.del = async function (id) {

  // Delete the Chat
  try {
    const deleted = await Chat.remove({_id: id});
    if (deleted.result.n === 0) {
      throw Error("Chat Could not be deleted")
    }
    return deleted
  } catch (e) {
    throw Error("Error Occured while Deleting the Chat")
  }
};




