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
  link: String,
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
},
{
  timestamps: true,
});
  


export default mongoose.model('Post', PostSchema);




