import express from 'express';
import { validateToken } from '../common/middleware/validate-token';
import { changeAlbumTitle } from './api/change-album-title';
import { deleteAlbum } from './api/delete-album';

const router = express.Router();

/*
 * Инициализирует album endpoints
 */

router.route('/delete-album').delete(validateToken, deleteAlbum);
router.route('/change-album-title').put(validateToken, changeAlbumTitle);

export default router;
