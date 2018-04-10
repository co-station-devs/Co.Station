const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const chatSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: Number,
  message: String,
  originalMessage: String,
  date_created: Date,
  date_modified: Date,
  payload: mongoose.Schema.Types.Mixed
});



chatSchema.plugin(mongoosePaginate);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

