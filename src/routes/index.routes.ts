import { Request, Response } from 'express';
import initGameRoutes from './game.routes';
import initAuthRoutes from './auth.routes';

const initRoutes = (app: any) => {
  app.use('/api/v1/auth', initAuthRoutes());
  app.use('/api/v1/game', initGameRoutes());
  app.get('/', (req: Request, res: Response) =>
    res.status(200).json({ message: 'Serving - backend API' })
  );
};

export default initRoutes;
