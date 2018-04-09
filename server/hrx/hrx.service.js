const Hrx = require('./hrx.model');
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
    return await Hrx.paginate(query, options);
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Hrx')
  }
};

exports.create = async function (hrx) {

  // Creating a new Mongoose Object by using the new keyword
  const newModel = new Hrx(hrx);
  newModel.date_created = new Date();

  try {
    // Saving the Hrx
    return await newModel.save();

  } catch (e) {

    // return a Error message describing the reason
    throw Error("Error while Creating Hrx")
  }
};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  try {
    return await Hrx.findOne({_id: id});
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Hrx')
  }
};

exports.update = async function update(hrx) {
  const id = hrx._id;
  let oldModel;

  try {
    //Find the old Hrx Object by the Id
    oldModel = await Hrx.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Hrx")
  }

  // If no old Hrx Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel.email = hrx.email;
  oldModel.firstName = hrx.firstName;
  oldModel.lastName = hrx.lastName;

  hrx.date_modified = new Date();

  try {
    return await oldModel.save();
  } catch (e) {
    throw Error("And Error occured while updating the Hrx");
  }
};


exports.del = async function (id) {

  // Delete the Hrx
  try {``
    const deleted = await Hrx.remove({_id: id});
    if (deleted.result.n === 0) {
      throw Error("Hrx Could not be deleted")
    }
    return deleted
  } catch (e) {
    throw Error("Error Occured while Deleting the Hrx")
  }
};




