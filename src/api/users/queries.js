import knex from '../../services/knex';

const register = (user) => {
  return knex('users')
    .insert(user)
    .returning('*')
    .then((user) => user[0]);
};

const getUserByEmail = (email) => {
  return knex('users')
    .where({ email })
    .then((user) => user[0]);
};

const getUserById = (id) => {
  return knex('users')
    .where({ id })
    .then((user) => user[0]);
};

const update = (id, user) => {
  return knex('users')
    .where({ id })
    .update(user)
    .returning('*')
    .then((user) => user[0]);
};

export default {
  getUserByEmail,
  register,
  getUserById,
  update,
};
