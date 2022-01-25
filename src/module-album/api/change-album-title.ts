import { Response } from 'express';
import { ExtendedRequest } from '../../common/middleware/validate-token';
import { AlbumModel } from '../album.schema';

interface ChangeAlbumBody {
  albumId: number;
  new_album_name: string;
}
/**
 * @param {ExtendedRequest} req - ExtendedRequest - The request object.
 * @param {Response} res - Response - The response object.
 * @returns The updated album.
 */
export const changeAlbumTitle = async (req: ExtendedRequest, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const { albumId, new_album_name } = req.body as ChangeAlbumBody;

  await AlbumModel.findOneAndUpdate(
    { id: albumId },
    {
      title: new_album_name,
    }
  );

  const updatedUlbum = await AlbumModel.findById(albumId);

  return res.status(200).send(updatedUlbum);
};
