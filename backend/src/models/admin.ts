import mongoose from 'mongoose';

const admin = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', admin);
export default Admin;
