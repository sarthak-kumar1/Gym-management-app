import mongoose from 'mongoose';

const admin = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'UserInfo', 
   // required: true
  },
  phoneNumber: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

const adminprofile = mongoose.model('adminprofile', admin);
export default adminprofile;
