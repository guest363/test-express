import { Request, Response } from 'express';
import { UserModel } from '../user.schema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
export const login = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  try {
    const { login, password, email } = req.body;

    /**
     * Если пришла почта - валидировать и искать по почте иначе поиск по логину
     */
    const currectLogin = email
      ? await UserModel.findOne({ email })
      : await UserModel.findOne({ login });

    const currectPassword = currectLogin
      ? currectLogin.checkPassword(password)
      : false;

    if (currectLogin && currectPassword) {
      const userJWT = await currectLogin.generateToken(currectLogin);

      return res.send({ token: userJWT });
    } else return res.send('Incurrect data');
  } catch (error) {
    return res.send(`Common error - ${error}`);
  }
};
