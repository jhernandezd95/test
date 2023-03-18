import * as bcrypt from 'bcrypt';

export const hashPassword = (value: string) => {
  return bcrypt.hashSync(value, 10);
};

export const compareHash = (value1: string, value2: string) => {
  return !bcrypt.compareSync(value1, value2);
};
