import mongoose, { Model, Schema } from 'mongoose';

export interface Photo {
  albumId: mongoose.Schema.Types.ObjectId;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: mongoose.Schema.Types.ObjectId;
}

const photoSchema = new Schema<Photo>({
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'album' },
  title: String,
  url: String,
  thumbnailUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

export const PhotoModel: Model<Photo> = mongoose.model(
  'Photo',
  photoSchema,
  'photo'
);
