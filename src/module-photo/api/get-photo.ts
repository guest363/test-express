import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { UserModel } from '../../module-user/user.schema';
import { PhotoModel } from './../photo.shcema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
export const getPhoto = async (req: ExtendedRequest, res: Response) => {
  if (!req.query) return res.sendStatus(400);

  const { ownerId, page, maxCount } = req.query;

  const user = await UserModel.findById(ownerId);
  const paginationConfig = {
    skip: parseInt(String(maxCount)) * parseInt(String(page)),
    limit: parseInt(String(maxCount)),
  };

  const photos = await PhotoModel.find(user ? { owner: user.id } : {})
    .skip(paginationConfig.skip)
    .limit(paginationConfig.limit);
  return res.status(200).send(photos);
};
