import * as jwt from 'jsonwebtoken';
import env from '../conf/env';

import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/error';
import { USER } from '../types/user.type';
import AuthService from '../services/auth.service';

export const jwtVerify = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: any = await verifyTokenHelper(req, res);
    if (!response.user) return false;

    const user: USER = response.user;
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: err?.message });
  }
};

export const verifyTokenHelper = async (req: Request | any, res: Response) => {
  try {
    const authToken: string = req.headers['authorization']?.split(' ')[1];
    const secretKey: string = env.JWT_TOKEN_KEY as string;
    if (authToken == null) {
      throw new UnauthorizedError('Unauthorized User');
    }

    const data: any = jwt.verify(authToken, secretKey);
    const user = await AuthService.findWithEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('Unauthorized User');
    }

    return {
      user,
      data,
    };
  } catch (error: any) {
    if (
      error?.name.includes('TokenExpiredError') ||
      error?.message.includes('jwt expired')
    ) {
      error.source = {
        FUNCTION: 'verifyTokenHelper',
      };
      error.message = `Token Expired at ${error?.expiredAt}`;
    }
    throw error;
  }
};
