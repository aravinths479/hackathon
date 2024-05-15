const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
