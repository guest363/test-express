import express from 'express';
import login from './api/login';
import { register } from './api/register';

const router = express.Router();

/*
 * Инициализирует пользовательские endpoints
 */

router.route('/login').post(login);

router.route('/register').post(register);

export default router;
