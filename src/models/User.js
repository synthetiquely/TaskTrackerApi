import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';

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
  projectsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
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
    role: this.role,
    confirmed: this.confirmed,
  }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    name: this.name,
    email: this.email,
    role: this.role,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = randomstring.generate();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.CLIENT}/user/confirmation/${this.confirmationToken}`;
};

schema.plugin(uniqueValidator, { message: 'This email is already taken.' });

export default mongoose.model('User', schema);
