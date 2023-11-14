var mongoose=require('mongoose');


const todoSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
    },
    is_delete: {
      type: Boolean,
      default: false
    },
    duedate: {
      type: Date,
      required: true
    },
    priority : {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'users',
    //   required: true
    // }
  });
  const Todo = mongoose.model('Todo', todoSchema);
  
  module.exports = Todo;
