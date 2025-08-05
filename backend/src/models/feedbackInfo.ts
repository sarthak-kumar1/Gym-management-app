import mongoose from 'mongoose';

const feedbackInfo = new mongoose.Schema({
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoachInfo', 
    required: true
  },
  clientImageUrl: {
    type: String,
    default: ''
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const FeedbackInfo = mongoose.model('FeedbackInfo', feedbackInfo);
export default FeedbackInfo;
