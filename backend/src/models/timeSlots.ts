// import mongoose from 'mongoose';

// const timeSlots = new mongoose.Schema({
//   coachId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CoachInfo', 
//     required: true
//   },
//   timeSlots: {
//     type: [
//       {
//         startTime: { type: String, required: true }, 
//         endTime: { type: String, required: true },
//         isBooked: { type: Boolean, required: true },  
//       }
//     ],
//     default: []
//   },
//   type: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   date: {
//     type: Date, // ✅ Corrected this line
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const TimeSlot = mongoose.model('TimeSlot', timeSlots);
// export default TimeSlot;


import mongoose from 'mongoose';

const timeSlots = new mongoose.Schema({
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoachInfo', 
    required: true
  },
  timeSlots: {
    type: [
      {
        startTime: { type: String, required: true }, 
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, required: true },  
      }
    ],
    default: []
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  startTime:{
    type: String,
    required:true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

const TimeSlot = mongoose.model('TimeSlot', timeSlots);
export default TimeSlot;