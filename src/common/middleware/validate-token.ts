import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserSign } from '../../module-user/user.schema';
import { config } from '../config';

export interface ExtendedRequest extends Request {
  decoded: UserSign;
}

export const validateToken = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers?.authorization?.split(' ')[1] || ''; // Bearer <token>

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, config.JWT_SECRET_KEY) as UserSign;

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error('Wrong token');
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401,
    };
    res.status(401).send(result);
  }
};
