import https from 'https';
import mongoose, { Model, Schema } from 'mongoose';
import { httpHandler } from '../common/support/http-handler';
import { PHOTO_URL } from '../common/variables';

interface Photo {
  albumId: mongoose.Schema.Types.ObjectId;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: mongoose.Schema.Types.ObjectId;
  loadPhotos: (this: Photo, userId: mongoose.Schema.Types.ObjectId) => Photo[];
}

const photoSchema = new Schema<Photo>({
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'album' },
  title: String,
  url: String,
  thumbnailUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

/* Methods */

photoSchema.methods.loadPhotos = async function (
  this: Photo,
  userId: mongoose.Schema.Types.ObjectId
) {
  return new Promise((resolve, reject) => {
    /**
   {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
   */

    https
      .get(PHOTO_URL, async (response) => {
        const photos: Photo[] = await httpHandler(response);
        for (const photo of photos) {
          await PhotoModel.create({ ...photo, owner: userId });
        }

        resolve(photos);
      })
      .on('error', (err) => {
        reject('Error: ' + err.message);
      });
  });
};
export const PhotoModel: Model<Photo> = mongoose.model(
  'Photo',
  photoSchema,
  'photo'
);
