const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const chatSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: String,
  message: String,
});



chatSchema.plugin(mongoosePaginate);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

