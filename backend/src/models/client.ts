import mongoose from 'mongoose';

const client = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo', 
    required: true
  },
  target: {
    type: String,
    required: true,
    trim: true
  },
  activity: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', client);
export default Client;
