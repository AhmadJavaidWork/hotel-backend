import knex from '../../services/knex';

const create = (booking) => {
  return knex('bookings')
    .insert(booking)
    .returning('*')
    .then((booking) => booking[0]);
};

const checkIfAlreadyBooked = (roomId) => {
  return knex('bookings').where({ roomId, status: 'Pending' });
};

export default {
  create,
  checkIfAlreadyBooked,
};
