const User = require('./user.model');
const ignoredValues = ['date_created', 'date_modified', '_id'];

exports.list = async function(query, params) {
  // Options setup for the mongoose paginate
  const options = {
    page: params.page,
    limit: params.limit,
    sort: params.sort
  };

  // Try Catch the awaited promise to handle the error

  return await User.Model.paginate(query, options);

};

exports.create = async function(user) {

  // Creating a new Mongoose Object by using the new keyword
  const newModel = new User.Model(user);
  newModel.date_created = new Date();

  // Saving the User
  return await newModel.save();


};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  return await User.Model.findOne({ _id: id }).populate('hrx');

};

exports.update = async function update(user) {
  const id = user._id;
  let oldModel;

  //Find the old User Object by the Id
  oldModel = await User.Model.findById(id);


  // If no old User Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel = User.updateUser(oldModel, user);
  oldModel.date_modified = new Date();

  return await oldModel.save();

};


exports.del = async function(id) {

  // Delete the User

  const deleted = await User.Model.remove({ _id: id });
  if (deleted.result.n === 0) {
    throw Error('User Could not be deleted');
  }
  return deleted;

};




