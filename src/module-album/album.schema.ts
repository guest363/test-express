import mongoose, { Model, Schema } from 'mongoose';

export interface Album {
  title: string;
  owner: mongoose.Schema.Types.ObjectId;
}
const albumSchema = new Schema<Album>({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const AlbumModel: Model<Album> = mongoose.model('Album', albumSchema);
