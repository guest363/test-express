import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { AlbumModel } from '../../module-album/album.schema';
import { UserModel } from '../../module-user/user.schema';
import { PhotoModel } from '../photo.shcema';
import { getPhotoData } from '../support/get-photo-data';

/**
 * Load all photos from the API into the database.
 * @param {ExtendedRequest} req - The request object.
 * @param {Response} res - Response - The response object.
 */
export const loadPhoto = async (req: ExtendedRequest, res: Response) => {
  const tokenData = req.decoded;

  const user = await UserModel.findOne(tokenData);
  if (!user) {
    return res.status(400).send('No user found');
  }

  const photos = await getPhotoData();

  const writePhotoQueue = photos.map(async (photo) => {
    const albumInDb = await AlbumModel.findOne({ title: photo.albumId });
    const album =
      albumInDb ||
      (await AlbumModel.create({
        title: photo.albumId,
        owner: user.id,
      }));

    await PhotoModel.create({
      ...photo,
      owner: user.id,
      albumId: album.id,
    });
  });

  await Promise.all(writePhotoQueue);

  return res.status(200).send('All photo are loaded');
};
