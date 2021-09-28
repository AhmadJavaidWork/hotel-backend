import knex from '../../../services/knex';

const getAll = () => {
  return knex('rooms').where({ deleted: false });
};

const getById = (id) => {
  return knex('rooms')
    .where({ id, deleted: false })
    .then((room) => room[0]);
};

const create = (room) => {
  return knex('rooms')
    .insert(room)
    .returning('*')
    .then((room) => room[0]);
};

const destroy = (id) => {
  return knex('rooms').where({ id }).update({ deleted: true });
};

const update = (id, room) => {
  return knex('rooms')
    .where({ id })
    .update(room)
    .returning('*')
    .then((room) => room[0]);
};

export default {
  getAll,
  getById,
  create,
  destroy,
  update,
};
