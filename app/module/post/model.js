import mongoose from 'mongoose';
import { date } from 'joi';
import bcrypt from 'bcrypt';

// const { Schema } = mongoose;


const PostSchema = mongoose.Schema({
  postID: {
    type: String,
  },
  post: {
    type: String,
  },
  user: String,

  username: {
    type: String,
  },
  media: {
    type: Array,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  commentCount: Number,

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
  


export default mongoose.model('post', PostSchema);




