import { Router } from 'express';
import { master, customerToken } from '../../services/passport';
import {
  getCustomerDetails,
  register,
  update,
  updatePassword,
} from './controller';
import { validator } from '../../utils/helpers';
import {
  customerValidations,
  customerUpdateValidations,
  customerPasswordUpdateValidations,
  checkCustomerExists,
  checkCustomerUpdatingHimself,
} from './helpers';

const router = new Router();

router.post(
  '/register',
  master(),
  customerValidations,
  validator,
  checkCustomerExists,
  register
);

router.put(
  '/:id',
  customerToken({ required: true }),
  customerUpdateValidations,
  validator,
  checkCustomerUpdatingHimself,
  update
);

router.post(
  '/password',
  customerToken({ required: true }),
  customerPasswordUpdateValidations,
  validator,
  updatePassword
);

router.get('/details', customerToken({ required: true }), getCustomerDetails);

export default router;
