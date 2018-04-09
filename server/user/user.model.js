const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  hrx: {type: mongoose.Schema.Types.ObjectId, ref: 'Hrx'},

  date_created: Date,
  date_modified: Date
});


function updateUser(oldModel, newModel){
  oldModel.email = newModel.email;
  oldModel.firstName = newModel.firstName;
  oldModel.lastName = newModel.lastName;
  return oldModel;
}

userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', userSchema);

module.exports = User;

