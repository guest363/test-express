import { Response } from 'express';
import mongoose from 'mongoose';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { getIdsFromParam } from '../../common/support/get-ids-from-param';
import { PhotoModel } from '../photo.shcema';

/**
 * `deletePhoto` is a function that deletes a photo from the database.
 * @param {ExtendedRequest} req - ExtendedRequest
 * @param {Response} res - Response - The response object.
 */
export const deletePhoto = async (req: ExtendedRequest, res: Response) => {
  if (!req.query) return res.sendStatus(400);

  const photoId = getIdsFromParam(String(req.query.photoId));

  for (const id of photoId) {
    if (mongoose.Types.ObjectId.isValid(id))
      await PhotoModel.findByIdAndDelete(id);
  }

  return res.status(204).send();
};
