// import mongoose from 'mongoose';

// const bookedWorkout = new mongoose.Schema({
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Client',
//     required: true
//   },
//   coachId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CoachInfo', 
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   type: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   about: {
//     type: String,
//     trim: true
//   },
//   feedbackId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'FeedbackInfo',
//     default: null
//   },
//   state: {
//     type: String,
//     enum: ['scheduled', 'canceled', 'finished', 'waiting_for_feedback', 'in_progress'],
//     default: 'scheduled'
//   }
// }, {
//   timestamps: true
// });

// const BookedWorkout = mongoose.model('BookedWorkout', bookedWorkout);
// export default BookedWorkout;


// import mongoose from 'mongoose';

// const bookedWorkout = new mongoose.Schema({
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Client',
//     required: true
//   },
//   coachId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CoachInfo',
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   timeSlot: {
//     start: { type: String, required: true },
//     end: { type: String, required: true },
//     isBooked: { type: Boolean, required: true },
//     duration: { type: String, required: true }
//   },
//   type: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   about: {
//     type: String,
//     trim: true
//   },
//   feedbackId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'FeedbackInfo',
//     default: null
//   },
//   state: {
//     type: String,
//     enum: ['scheduled', 'canceled', 'finished', 'waiting_for_feedback', 'in_progress'],
//     default: 'scheduled'
//   }
// }, {
//   timestamps: true
// });


// const BookedWorkout = mongoose.model('BookedWorkout', bookedWorkout);
// export default BookedWorkout;

import mongoose from 'mongoose';

const bookedWorkout = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoachInfo',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    start: { type: String, required: true },
    end: { type: String, required: true },
    isBooked: { type: Boolean, required: true },
    duration: { type: String, required: true }
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  about: {
    type: String,
    trim: true
  },
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedbackInfo',
    default: null
  },
  state: {
    type: String,
    enum: ['scheduled', 'canceled', 'finished', 'waiting_for_feedback', 'in_progress'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});


const BookedWorkout = mongoose.model('BookedWorkout', bookedWorkout);
export default BookedWorkout;
