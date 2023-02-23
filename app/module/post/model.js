import { string } from 'joi';
import mongoose from 'mongoose';
import comments from '../comment/model';

// const { Schema } = mongoose;


const PostSchema = mongoose.Schema({
  postID: {
    type: String,
  },
  post: {
    type: String,
  },
 
  userInfo: {
    username: String,
    userID: String,
    photo: String,
  },
  media: Array,
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },

  commentCount: Number,
  likeCount: Number,
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
  


export default mongoose.model('Post', PostSchema);




