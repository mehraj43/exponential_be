import crypto from 'crypto';
import env from '../../conf/env';

const matchPassword = async (inputPassword: string, actualPassword: any) => {
  const inputHash = await createPasswordHash(inputPassword, env.MY_SIGN);
  const response: boolean = inputHash === actualPassword;
  return response;
};

const createSalt = () => {
  return env.MY_SIGN;
};

const createPasswordHash = async (password: string, salt: any) => {
  const hash: string = await pbkdf2Async(password, salt, 1000, 64, 'sha512');

  return hash;
};

function pbkdf2Async(
  password: string,
  salt: any,
  iterations: number,
  keylen: number,
  digest: any
) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
      err ? reject(err) : resolve(key.toString('hex'));
    });
  });
}

const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export default {
  createPasswordHash,
  createSalt,
  matchPassword,
  generateRandomNumber,
};
