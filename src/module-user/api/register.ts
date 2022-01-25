import { Request, Response } from "express";
import { userModel } from "../user.schema";


export const register = async (req:Request, res:Response) => {
    try {
      req.log.info(req.body);
      if (!req.body) return res.sendStatus(400);
  
      const user = await userModel.create(req.body);
  
      return res.status(200).send(`Создан новый пользователь ${user.email}`);
    } catch (error) {
      return res.send(`Ошибка создания пользователя ${error}`);
    }
  }