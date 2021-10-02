import queries from './queries';
import {
  success,
  notFound,
  created,
  deleted,
  updated,
} from '../../../utils/response';
import { roomView } from './helpers';
import { errorLogger } from '../../../utils/helpers';

export const getAll = async (req, res) => {
  try {
    const allRooms = await queries.getAll();
    console.log(ahmad);
    return success(
      res,
      allRooms.map((room) => roomView(room))
    );
  } catch (error) {
    errorLogger(res, req.baseUrl, error);
  }
};

export const getById = async ({ params }, res) => {
  try {
    const { id } = params;
    const room = await queries.getById(id);
    if (room) return success(res, roomView(room));
    return notFound(res);
  } catch (error) {
    errorLogger(res, req.baseUrl, error);
  }
};

export const create = async ({ body }, res) => {
  const { floor, rent } = body;
  const room = await queries.create({ floor, rent });
  created(res, roomView(room));
};

export const destroy = async ({ params }, res) => {
  const { id } = params;
  const room = await queries.getById(id);
  if (!room) return notFound(res);
  await queries.destroy(id);
  return deleted(res);
};

export const update = async ({ params, body }, res) => {
  const { id } = params;
  const { floor, rent } = body;
  const room = await queries.getById(id);
  if (!room) return notFound(res);
  const updatedRoom = await queries.update(id, { floor, rent });
  return updated(res, roomView(updatedRoom));
};
