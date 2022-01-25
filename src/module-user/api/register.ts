import { Request, Response } from 'express';
import { UserModel } from '../user.schema';

/**
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns The user object.
 */
export const register = async (req: Request, res: Response) => {
  try {
    if (!req.body) return res.sendStatus(400);

    const user = await UserModel.create(req.body);

    return res.status(200).send(`Создан новый пользователь ${user.email}`);
  } catch (error) {
    return res.send(`Ошибка создания пользователя ${String(error)}`);
  }
};
