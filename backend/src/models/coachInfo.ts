import mongoose from 'mongoose';

const coach = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  about: {
    type: String,
    default: '',
    trim: true
  },
  specializations: {
    type: [String],
    default: []
  },
  fileUrls: {
    type: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadDate: { type: Date, default: Date.now }
      }
    ],
    default: []
  },
  profileImage: {
    type: String,
    default: ''
  },
  
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

const CoachInfo = mongoose.model('CoachInfo', coach);
export default CoachInfo;
