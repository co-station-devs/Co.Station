const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const hrxSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: Number,
  message: String,
  date_created: Date,
  date_modified: Date,
});



hrxSchema.plugin(mongoosePaginate);
const Chat = mongoose.model('Chat', hrxSchema);

module.exports = Chat;

