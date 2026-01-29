import mongoose from 'mongoose';

const userDetails = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userDetails);
