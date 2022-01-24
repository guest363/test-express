import express from 'express';
import { NewUser } from './user-register.model';

const router = express.Router();

/*
 * Инициализирует пользовательские endpoints
 */

router.route('/login').post((req, res) => {
  if (!req.body) return res.sendStatus(400);

  return res.sendStatus(200);
});
router.route('/register').post((req, res) => {
  req.log.info(req.body);
  if (!req.body) return res.sendStatus(400);

  const user = new NewUser(req.body);

  user.save(function (err?: string | Error) {
    if (err) return req.log.error(err);
    return res.send(user);
  });
  return res.sendStatus(200);
});

export default router;
