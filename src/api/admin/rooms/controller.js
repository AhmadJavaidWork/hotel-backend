import queries from './queries';
import {
  success,
  notFound,
  created,
  deleted,
  updated,
} from '../../../utils/response';
import { roomView } from './helpers';

export const getAll = async (req, res) => {
  const allRooms = await queries.getAll();
  return success(
    res,
    allRooms.map((room) => roomView(room))
  );
};

export const getById = async ({ params }, res) => {
  const { id } = params;
  const room = await queries.getById(id);
  if (room) return success(res, roomView(room));
  return notFound(res);
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
