import loginUtils from './pass.util';

export const parseUserObject = async (body: any) => {
  const newSalt: any = loginUtils.createSalt();
  const newHash: string = await loginUtils.createPasswordHash(
    body.password,
    newSalt
  );

  const name: string = body.name;
  const email: string = body.email.toLowerCase();
  const passwordHash: string = newHash;

  const userObj: any = {
    name,
    email,
    password: passwordHash,
  };

  return userObj;
};
