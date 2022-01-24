import mongoose from 'mongoose';
const { Schema } = mongoose;

export const albumSchema = new Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
