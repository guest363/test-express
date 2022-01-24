import mongoose from 'mongoose';
const { Schema } = mongoose;

export const userSchema = new Schema({
  login: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
});
