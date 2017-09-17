import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';

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
    unique: true,
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

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    name: this.name,
    email: this.email,
    confirmed: this.confirmed,
  }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    name: this.name,
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

schema.plugin(uniqueValidator, { message: 'This email is already taken.' });

export default mongoose.model('User', schema);
