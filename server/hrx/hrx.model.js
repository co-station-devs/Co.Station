const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const hrxSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  Age: Number,
  SeniorityYears: Number,
  SeniorityEmployerYears: Number,
  PostalCode: Number,
  Status: {
    type: String,
    enum: ['Single', 'Married', 'LivingTogether']
  },

  date_created: Date,
  date_modified: Date,
});



hrxSchema.plugin(mongoosePaginate);
const Hrx = mongoose.model('Hrx', hrxSchema);

module.exports = Hrx;

