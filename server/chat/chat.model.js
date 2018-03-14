const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const chatSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String,
});



chatSchema.plugin(mongoosePaginate);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

