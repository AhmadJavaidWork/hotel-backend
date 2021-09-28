import { genSalt, hash } from 'bcrypt';

export const genHash = async (password) => {
  const salt = await genSalt(10);
  password = await hash(password, salt);
  return password;
};
