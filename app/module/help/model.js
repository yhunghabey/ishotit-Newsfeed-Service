import mongoose from 'mongoose';
import { date } from 'joi';

// const { Schema } = mongoose;


const HelpDeskSchema = mongoose.Schema({
  user: String,

  username: {
    type: String,
  },

  subject: {
    type: String,
  },

  message: {
    type: String
  },

  status: {
    type: String,
    enum: ['REPORT', 'QUESTION', 'ISSUE', 'ENQUIRY'],
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
  


export default mongoose.model('helpdesk', HelpDeskSchema);




