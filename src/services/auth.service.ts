import { BadRequestError, UnauthorizedError } from '../errors/error';
import UserHelper from '../helpers/user.helper';
import { USER, USER_TYPE } from '../types/user.type';
import createJwtToken from '../utils/jwt/auth';
import { parseUserObject } from '../utils/password/parser';
import loginUtils from '../utils/password/pass.util';

const AuthService = () => {};

AuthService.createUser = async (body: any) => {
  try {
    const { name, email } = body;

    const user_data: USER = await AuthService.findWithEmail(email);

    if (user_data) {
      throw new BadRequestError('User Already Present in DB');
    }

    const userData: object = {
      name,
      email,
    };
    const user: USER_TYPE = await UserHelper.create(userData);
    const token = await createJwtToken(user);
    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error: any) {
    if (!error.source) {
      error.source = {
        SERVICE: 'AuthService.createUser',
      };
    }

    throw error;
  }
};

AuthService.findWithEmail = async (email: string) => {
  try {
    const query: object = {
      email: email.toLocaleLowerCase(),
    };
    const selectField: string = '_id email name';
    const user = await UserHelper.findOne(query, selectField);
    return user;
  } catch (error: any) {
    if (!error.source) {
      error.source = {
        SERVICE: 'AuthService.findWithEmail',
      };
    }

    throw error;
  }
};

AuthService.login = async (email: string) => {
  try {
    const user: USER_TYPE = await UserHelper.findOne({
      email: email.toLocaleLowerCase(),
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const token: string = await createJwtToken(user);

    const responseObj = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return responseObj;
  } catch (error: any) {
    if (!error.source) {
      error.source = {
        SERVICE: 'AuthService.login',
      };
    }

    throw error;
  }
};

export default AuthService;
