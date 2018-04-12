const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  lang: String,
  amei: Number,
  hrx: {type: mongoose.Schema.Types.ObjectId, ref: 'Hrx'},
  showExtra: Boolean,
  showTranslations: Boolean,

  date_created: Date,
  date_modified: Date
});


function updateUser(oldModel, newModel){
  oldModel.email = newModel.email;
  oldModel.firstName = newModel.firstName;
  oldModel.lastName = newModel.lastName;
  oldModel.amei = newModel.amei;
  oldModel.showExtra = newModel.showExtra;
  oldModel.showTranslations = newModel.showTranslations;
  oldModel.lang = newModel.lang;
  return oldModel;
}

userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', userSchema);

module.exports = { Model: User, updateUser: updateUser};

