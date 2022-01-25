import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { getIdsFromParam } from '../../common/support/get-ids-from-param';
import { AlbumModel } from "../album.schema";

/**
 * `deleteAlbum` is a function that deletes an album from the database
 * and all ref photos.
 * @param {ExtendedRequest} req - ExtendedRequest
 * @param {Response} res - Response - The response object.
 */
export const deleteAlbum = async (req: ExtendedRequest, res: Response) => {
  if (!req.query) return res.sendStatus(400);

  const albumId = getIdsFromParam(String(req.query.albumId));

  for (const id of albumId) {
    await AlbumModel.findByIdAndDelete(id);
  }

  return res.status(204).send();
};
