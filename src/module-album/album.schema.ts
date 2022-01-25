import mongoose, { Model, Schema } from 'mongoose';
import { PhotoModel } from './../module-photo/photo.shcema';

export interface Album {
  title: string;
  owner: mongoose.Schema.Types.ObjectId;
}
const albumSchema = new Schema<Album>({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

albumSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    await PhotoModel.deleteMany({ user: doc._id });
  }
);

export const AlbumModel: Model<Album> = mongoose.model('Album', albumSchema);
