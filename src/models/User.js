import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// TODO: check for email uniquness
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: {
    type: String,
    default: false,
  },
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcryptjs.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcryptjs.hashSync(password, 10);
};

export default mongoose.model('User', schema);
