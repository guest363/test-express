import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { UserModel } from '../../module-user/user.schema';
import { getPhotoData } from '../support/get-photo-data';
import { PhotoModel } from './../photo.shcema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
export const loadPhoto = async (req: ExtendedRequest, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const tokenData = req.decoded;

  const user = await UserModel.findOne(tokenData);

  const photos = await getPhotoData();

  console.log(photos);

  for (const photo of photos) {
    await PhotoModel.create({ ...photo, owner: user?.id });
  }

  return res.sendStatus(200);
};
