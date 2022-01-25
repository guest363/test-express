import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { UserModel } from '../../module-user/user.schema';
import { getPhotoData } from '../support/get-photo-data';
import { AlbumModel } from './../../module-album/album.schema';
import { PhotoModel } from './../photo.shcema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
export const loadPhoto = async (req: ExtendedRequest, res: Response) => {
  const tokenData = req.decoded;

  const user = await UserModel.findOne(tokenData);

  const photos = await getPhotoData();

  for (const photo of photos) {
    const albumInDb = await AlbumModel.findOne({ title: photo.albumId });
    const album = albumInDb
      ? albumInDb
      : await AlbumModel.create({
          title: photo.albumId,
          owner: user?.id,
        });

    await PhotoModel.create({ ...photo, owner: user?.id, albumId: album.id });
  }

  return res.status(200).send('All photo are loaded');
};
