import { Request, Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { UserModel } from '../../module-user/user.schema';
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

  const photos = await PhotoModel.loadPhotos(user?.id);
  console.log(photos);
};
