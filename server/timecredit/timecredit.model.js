const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const timeCreditSchema = new mongoose.Schema({
  type: Number,
  motivation: {
    type: String,
    enum: ['Type1.Child8j', 'Type1.Palliative', 'Type1.Education', 'Type2.Disabled', 'Type2.ChildMed']
  },
  minAge: Number,
  minCareer: Number,
  minCareerAM: Number,
  MaxMonths: Number,
  minMonths: Number,
  Comp5Min: Number,
  Comp5Plus: Number,
});

timeCreditSchema.plugin(mongoosePaginate);
const TimecreditModel = mongoose.model('Timecredit', timeCreditSchema);

module.exports = TimecreditModel;

