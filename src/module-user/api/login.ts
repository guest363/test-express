import { Request, Response } from 'express';
import { UserModel } from '../user.schema';

interface LoginBody {
  login: string;
  password: string;
  email: string;
}

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns A token.
 */
const loginRoute = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  try {
    const { login, password, email } = req.body as LoginBody;

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
      const userJWT = currectLogin.generateToken(currectLogin);

      return res.send({ token: userJWT });
    }
    return res.send('Incurrect data');
  } catch (error) {
    if (error instanceof Error)
      return res.send(`Common error - ${error.message}`);
    return res.send(`Common error - ${String(error)}`);
  }
};

export default loginRoute;
