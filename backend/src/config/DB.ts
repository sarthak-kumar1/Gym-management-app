import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const MONGO_URI = 'mongodb+srv://ProjectEducationTeam4:npKj6AyzbwBmDpvR@projecteducationteam4.lfrpba5.mongodb.net/ProjectEducationTeam4';
const MONGO_URI = process.env.MONGO_URI || '';
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log('📡 MONGO_URI:', uri);
  if (!uri) {
    console.error('❌ No MONGO_URI found in .env');
    process.exit(1);
  }

  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};


// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log(' MongoDB connected');
//   } catch (error) {
//     console.error(' MongoDB connection error:', error);
//     process.exit(1);
//   }
// };
