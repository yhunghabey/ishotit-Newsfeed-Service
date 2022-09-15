import mongoose from 'mongoose';
import { date } from 'joi';

// const { Schema } = mongoose;


const CommentsSchema = mongoose.Schema({
  commentID: {
    type: String,
  },
  postID: {
    type: mongoose.Schema.ObjectId,
  },
  user: String,

  username: {
    type: String,
  },

  comment: {
    type: String
  },

  createdAt: {
      type: Date,
      default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
});
  


export default mongoose.model('Comments', CommentsSchema);




