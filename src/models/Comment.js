import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    _creator: {
      type: String,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Comment', schema);
