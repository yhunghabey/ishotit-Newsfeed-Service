import mongoose from 'mongoose';
import { date } from 'joi';

// const { Schema } = mongoose;


const LikeSchema = mongoose.Schema({
  likeID: {
    type: String,
  },
  postID: {
    type: String,
  },
  user: String,

  username: {
    type: String,
  },

  createdAt: {
      type: Date,
      default: Date.now,
  },

});
  


export default mongoose.model('likes', LikeSchema);




