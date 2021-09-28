import queries from './queries';
import {
  created,
  notFound,
  success,
  updated,
  wrongPassword,
} from '../../utils/response';
import { sign } from '../../services/jwt';
import { genHash } from '../../services/bcrypt';
import bcrypt from 'bcrypt';
import { customerTokenView, customerView } from './helpers';

export const register = async ({ body }, res) => {
  const { firstName, lastName, email, country, password } = body;
  const customer = { firstName, lastName, email, country, password };
  customer.password = await genHash(password);
  const registeredCustomer = await queries.register(customer);
  const token = await sign(customerTokenView(registeredCustomer));
  return created(res, {
    customer: customerView(registeredCustomer),
    token,
  });
};

export const update = async ({ params, body }, res) => {
  const { firstName, lastName, country } = body;
  const receivedCustomer = { firstName, lastName, country };
  const customer = await queries.getCustomerById(params.id);
  if (!customer) return notFound(res);
  const updatedCustomer = await queries.update(params.id, receivedCustomer);
  return updated(res, customerView(updatedCustomer));
};

export const updatePassword = async ({ body, user }, res) => {
  const { newPassword, password } = body;
  const { id } = user;
  const customer = {};
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return wrongPassword(res);
  customer.password = await genHash(newPassword);
  await queries.update(id, customer);
  return updated(res);
};

export const getCustomerDetails = async ({ user }, res) => {
  const { id } = user;
  const customer = await queries.getCustomerById(id);
  return success(res, customerView(customer));
};
