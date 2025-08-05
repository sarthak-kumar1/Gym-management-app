import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Client', 'Coach'], // ✅ allow 'user'
    default: 'Client',
  },
  
  profileImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const UserInfo = mongoose.model('UserInfo', userSchema);
export default UserInfo;
