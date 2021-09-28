import knex from '../../services/knex';

const getAvailableRooms = () => {
  return knex('rooms').where({ deleted: false, booked: false });
};

export default {
  getAvailableRooms,
};
