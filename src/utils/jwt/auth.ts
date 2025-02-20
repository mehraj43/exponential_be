import * as jwt from 'jsonwebtoken';
import { USER } from '../../types/user.type';
import env from '../../conf/env';

const createJwtToken = async (user: USER) => {
  console.log('user', user?._id);
  const token: string = await jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    env.JWT_TOKEN_KEY as string
  );

  return token;
};

export default createJwtToken;
