import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Waiting',
    },
    _creator: {
      type: String,
      ref: 'User',
    },
    _assignee: {
      type: String,
      ref: 'User',
    },
    budgetTime: {
      type: Number,
      required: true,
    },
    actualTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', schema);
