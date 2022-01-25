import express from 'express';
import { userModel } from './user.schema';

const router = express.Router();

/*
 * Инициализирует пользовательские endpoints
 */

router.route('/login').post((req, res) => {
  if (!req.body) return res.sendStatus(400);

  return res.sendStatus(200);
});

router.route('/register').post(async (req, res) => {
  try {
    req.log.info(req.body);
    if (!req.body) return res.sendStatus(400);

    const user = await userModel.create(req.body);

    return res.status(200).send(`Создан новый пользователь ${user.email}`);
  } catch (error) {
    return res.send(`Ошибка создания пользователя ${error}`);
  }
});

export default router;
