const Hrx = require('./hrx.model');
const ignoredValues = ['date_created', 'date_modified', '_id'];

exports.find = async function(name) {

  const names = name.replace(', ', ' ').replace(',', ' ').split(' ');

    let query;

    if (names.length > 1) {
      query = {
        firstName: { $regex: names[0], $options: 'i' },
        lastName: { $regex: names[1], $options: 'i' }
      };
    } else {
      query = { amei: { $eq: +name } };
    }
    return await Hrx.findOne(query);

};


exports.create = async function(hrx) {

  // Creating a new Mongoose Object by using the new keyword
  const newModel = new Hrx(hrx);
  newModel.date_created = new Date();

  // Saving the Hrx
  return await newModel.save();

};

exports.read = async function read(id) {
  // Try Catch the awaited promise to handle the error

  return await Hrx.findOne({ _id: id });

};

exports.update = async function update(hrx) {
  const id = hrx._id;
  let oldModel;

  //Find the old Hrx Object by the Id
  oldModel = await Hrx.findById(id);


  // If no old Hrx Object exists return false
  if (!oldModel) {
    return false;
  }

  oldModel.firstName = hrx.firstName;
  oldModel.lastName = hrx.lastName;
  oldModel.startWorkingAtAmDate = hrx.startWorkingAtAmDate;
  oldModel.startWorkingDate = hrx.startWorkingDate;
  oldModel.status = hrx.status;
  oldModel.postalCode = hrx.postalCode;
  oldModel.birthDate = hrx.birthDate;
  oldModel.amei = hrx.amei;



  oldModel.date_modified = new Date();

    return await oldModel.save();

};


exports.del = async function(id) {

  // Delete the Hrx
    const deleted = await Hrx.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error('Hrx Could not be deleted');
    }
    return deleted;
};




