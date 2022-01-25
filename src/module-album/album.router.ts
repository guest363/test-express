import express from 'express';
import { validateToken } from '../common/middleware/validate-token';
import { deleteAlbum } from './api/delete-album';

const router = express.Router();

/*
 * Инициализирует album endpoints
 */

router.route('/delete-album').delete(validateToken, deleteAlbum);

export default router;
