const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const hrxSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  amei: Number,
  seniorityYears: Number,
  seniorityEmployerYears: Number,
  postalCode: Number,
  status: {
    type: String,
    enum: ['Single', 'Married', 'LivingTogether']
  },

  date_created: Date,
  date_modified: Date,
});



hrxSchema.plugin(mongoosePaginate);
const Hrx = mongoose.model('Hrx', hrxSchema);

module.exports = Hrx;

