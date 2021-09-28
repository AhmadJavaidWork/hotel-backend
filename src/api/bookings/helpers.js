import { body } from 'express-validator';
import { resStatuses } from '../../constants/response';
import queries from './queries';

export const bookingValidations = [
  body('roomId').isNumeric(),
  body('customerId').isNumeric(),
  body('from').isString(),
  body('to').isString(),
];

export const checkIfAlreadyBooked = ({ body }, res, next) => {
  const { roomId } = body;
  const booking = queries.checkIfAlreadyBooked(roomId);
  if (booking) {
    return res
      .status(resStatuses.badRequest)
      .json({ success: false, message: 'This Room is already booked' });
  }
  return next();
};
