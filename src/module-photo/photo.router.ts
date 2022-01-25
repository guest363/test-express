import express from 'express';
import { validateToken } from '../common/middleware/validate-token';
import { loadPhoto } from './api/load-photo';

const router = express.Router();

/*
 * Инициализирует photo endpoints
 */

router.route('/load-photos').post(validateToken, loadPhoto);

export default router;
