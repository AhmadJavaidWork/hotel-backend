import queries from './queries';
import {
  created,
  updated,
  notFound,
  wrongPassword,
  success,
} from '../../utils/response';
import { sign } from '../../services/jwt';
import { genHash } from '../../services/bcrypt';
import bcrypt from 'bcrypt';
import { userTokenView, userView } from './helpers';

export const register = async ({ body }, res) => {
  const { firstName, lastName, email, country, password } = body;
  const user = { firstName, lastName, email, country, password };
  user.password = await genHash(password);
  const registeredUser = await queries.register(user);
  const token = await sign(userTokenView(registeredUser));
  return created(res, {
    user: userView(registeredUser),
    token,
  });
};

export const update = async ({ params, body }, res) => {
  const { firstName, lastName, country } = body;
  const receivedUser = { firstName, lastName, country };
  const user = await queries.getUserById(params.id);
  if (!user) return notFound(res);
  const updatedUser = await queries.update(params.id, receivedUser);
  return updated(res, userView(updatedUser));
};

export const updatePassword = async (req, res) => {
  const { newPassword, password } = req.body;
  const { id } = req.user;
  const user = {};
  const isMatch = await bcrypt.compare(password, req.user.password);
  if (!isMatch) return wrongPassword(res);
  user.password = await genHash(newPassword);
  await queries.update(id, user);
  return updated(res);
};

export const getUserDetails = async (req, res) => {
  const { id } = req.user;
  const user = await queries.getUserById(id);
  return success(res, userView(user));
};
