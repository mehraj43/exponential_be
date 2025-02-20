import env from './conf/env';
import { dbConnection } from './db';
import express from 'express';
import cors from 'cors';
import initRoutes from './routes/index.routes';

const app = express();

const PORT = env.PORT || 5000;

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

initRoutes(app);

console.assert(dbConnection);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
