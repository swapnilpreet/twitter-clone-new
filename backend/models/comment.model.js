const mongoose = require('mongoose');
const { userInfo } = require('os');

const CommentSchema = new mongoose.Schema({
      comment:{
        type: 'string',
        required: true,
      },
      postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required: true
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
      }
},{
    timestamps:true,
});


const CommentModel = mongoose.model('Comment',CommentSchema);
module.exports = CommentModel;