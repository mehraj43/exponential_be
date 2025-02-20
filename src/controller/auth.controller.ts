import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

const AuthController = () => {};

AuthController.createUser = async (req: Request, res: Response) => {
  try {
    const data: any = await AuthService.createUser(req.body);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message });
  }
};

AuthController.login = async (req: Request, res: Response) => {
  try {
    const body: any = req.body;
    const { email } = body;
    const respObj: any = await AuthService.login(email);
    return res.status(200).json(respObj);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message });
  }
};

export default AuthController;
