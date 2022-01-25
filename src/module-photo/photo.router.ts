import express from 'express';
import { validateToken } from '../common/middleware/validate-token';
import { getPhoto } from './api/get-photo';
import { loadPhoto } from './api/load-photo';

const router = express.Router();

/*
 * Инициализирует photo endpoints
 */

router.route('/load-photos').get(validateToken, loadPhoto);

router.route('/get-photos').get(getPhoto);

export default router;
