import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    addedBy: {
      type: String,
      enum: ['manual', 'admin', 'system'],
      required: true,
    },
  },
  { timestamps: true } 
);

const Coache = mongoose.model("Coache", coachSchema);

export default Coache;
