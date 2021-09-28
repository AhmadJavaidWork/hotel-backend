import { Router } from 'express';
import { bookRoom } from './controller';
import { bookingValidations, checkIfAlreadyBooked } from './helpers';
import { validator } from '../../utils/helpers';

const router = new Router();

router.post(
  '/book-room',
  bookingValidations,
  validator,
  checkIfAlreadyBooked,
  bookRoom
);

export default router;
