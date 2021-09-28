import knex from '../../services/knex';

const register = (customer) => {
  return knex('customers')
    .insert(customer)
    .returning('*')
    .then((customer) => customer[0]);
};

const getCustomerByEmail = (email) => {
  return knex('customers')
    .where({ email })
    .then((customer) => customer[0]);
};

const getCustomerById = (id) => {
  return knex('customers')
    .where({ id })
    .then((customer) => customer[0]);
};

const update = (id, customer) => {
  return knex('customers')
    .where({ id })
    .update(customer)
    .returning('*')
    .then((customer) => customer[0]);
};

export default {
  register,
  getCustomerByEmail,
  getCustomerById,
  update,
};
