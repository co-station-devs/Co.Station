const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const address = new mongoose.Schema({
  description: String,
  street: String,
  number: Number,
  city: String,
  state: String,
  postalCode: Number,
  active: Boolean
});


const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  address: [address],
  date_created: Date,
  date_modified: Date,
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

