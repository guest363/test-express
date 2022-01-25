import http from 'http';
import { httpHandler } from '../../common/support/http-handler';
import { PHOTO_URL } from '../../common/variables';
import { Photo } from '../photo.shcema';

export const getPhotoData = (): Promise<Photo[]> => new Promise((resolve, reject) => {
    /**
   {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
   */

    http
      .get(PHOTO_URL, async (response) => {
        const photos = (await httpHandler(response)) as Photo[];
        resolve(photos);
      })
      .on('error', (err) => {
        reject(`Error: ${  err.message}`);
      });
  });
