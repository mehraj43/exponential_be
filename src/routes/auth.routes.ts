import { Router } from 'express';
import AuthController from '../controller/auth.controller';

const initAuthRoutes = () => {
  const authRoutes: Router = Router();

  authRoutes.post('/signup', AuthController.createUser);
  authRoutes.post('/login', AuthController.login);

  return authRoutes;
};

export default initAuthRoutes;
