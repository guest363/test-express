import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

export const userRegisterSchema = new Schema({
  login: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  registerDate: { type: Date, default: Date.now },
});
