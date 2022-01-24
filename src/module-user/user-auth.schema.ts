import mongoose from 'mongoose';
const { Schema } = mongoose;

export const userAuthSchema = new Schema({
  login: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
