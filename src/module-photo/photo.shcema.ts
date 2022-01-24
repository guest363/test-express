import mongoose from 'mongoose';
const { Schema } = mongoose;

export const photoSchema = new Schema({
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  title: String,
  url: String,
  thumbnailUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
