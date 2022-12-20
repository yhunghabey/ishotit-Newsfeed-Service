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
  userInfo: {
    username: String,
    userId: String,
    photo: String,
  },

  username: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['LIKED', 'UNLIKED'],
    default: 'UNLIKED'
  }

});
  


export default mongoose.model('likes', LikeSchema);




