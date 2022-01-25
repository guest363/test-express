import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { PhotoModel } from './../photo.shcema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
export const deletePhoto = async (req: ExtendedRequest, res: Response) => {
  if (!req.query) return res.sendStatus(400);

  const photoId = String(req.query.photoId)
    .split(',')
    .map((id) => id.trim());

  for (const id of photoId) {
    await PhotoModel.findByIdAndDelete(id);
  }

  return res.status(204).send();
};
