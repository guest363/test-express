import express from 'express';
import { validateToken } from '../common/middleware/validate-token';
import { deletePhoto } from './api/delete-photo';
import { getPhoto } from './api/get-photo';
import { loadPhoto } from './api/load-photo';

const router = express.Router();

/*
 * Инициализирует photo endpoints
 */

router.route('/load-photos').get(validateToken, loadPhoto);

router.route('/get-photos').get(getPhoto);

router.route('/delete-photo').delete(validateToken, deletePhoto);

export default router;
