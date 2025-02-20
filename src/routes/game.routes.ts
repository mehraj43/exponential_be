import { Router } from 'express';
import { getScore, handleButtonClick } from '../controller/gameController';
import { jwtVerify } from '../middlewares/auth.middleware';

const initGameRoutes = () => {
  const gameRoutes: Router = Router();
  gameRoutes.all('*', jwtVerify);
  gameRoutes.get('/click', handleButtonClick);
  gameRoutes.get('/score', getScore);

  return gameRoutes;
};

export default initGameRoutes;
