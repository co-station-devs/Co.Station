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

  try {
    return await User.Model.paginate(query, options);
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Users');
  }
};

exports.create = async function(user) {

  // Creating a new Mongoose Object by using the new keyword
  const newModel = new User.Model(user);
  newModel.date_created = new Date();

  try {
    // Saving the User
    return await newModel.save();

  } catch (e) {
    console.error(e);
    // return a Error message describing the reason
    throw Error('Error while Creating User');
  }
};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  try {
    return await User.Model.findOne({ _id: id }).populate('hrx');
  } catch (e) {
    console.error(e);
// return a Error message describing the reason
    throw Error('Error while Paginating Users');
  }
};

exports.update = async function update(user) {
  const id = user._id;
  let oldModel;

  try {
    //Find the old User Object by the Id
    oldModel = await User.Model.findById(id);
  } catch (e) {
    console.error(e);
    throw Error('Error occured while Finding the User');
  }

  // If no old User Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel = User.updateUser(oldModel, user);
  oldModel.date_modified = new Date();

  try {
    return await oldModel.save();
  } catch (e) {
    console.error(e);
    throw Error('And Error occured while updating the User');
  }
};


exports.del = async function(id) {

  // Delete the User
  try {
    ``;
    const deleted = await User.Model.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error('User Could not be deleted');
    }
    return deleted;
  } catch (e) {
    console.error(e);
    throw Error('Error Occured while Deleting the User');
  }
};




