import { body } from 'express-validator';
import { resStatuses } from '../../constants/response';
import queries from './queries';

export const customerValidations = [
  body('firstName').isLength({ min: 3, max: 255 }),
  body('lastName').isLength({ min: 3, max: 255 }),
  body('email').isEmail(),
  body('email').isLength({ max: 255 }),
  body('password').isLength({ min: 8, max: 50 }),
  body('country').isLength({ min: 4, max: 80 }),
];

export const customerUpdateValidations = [
  body('firstName').isLength({ min: 3, max: 255 }),
  body('lastName').isLength({ min: 3, max: 255 }),
  body('country').isLength({ min: 4, max: 80 }),
];

export const customerPasswordUpdateValidations = [
  body('password').isLength({ min: 8, max: 50 }),
  body('newPassword').isLength({ min: 8, max: 50 }),
];

export const checkCustomerExists = async ({ body }, res, next) => {
  const { email } = body;
  const user = await queries.getCustomerByEmail(email);
  if (user) {
    return res
      .status(resStatuses.badRequest)
      .json({ success: false, message: 'Customer already exists' });
  }
  return next();
};

export const checkCustomerUpdatingHimself = async (
  { params, user },
  res,
  next
) => {
  if (params.id != user.id) {
    return res.status(resStatuses.unAuthorized).json({
      success: false,
      message: `You cannot update someone else's data`,
    });
  }
  return next();
};

export const customerView = (customer) => {
  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    role: customer.role,
    country: customer.country,
    createdAt: customer.created_at,
    updatedAt: customer.updated_at,
  };
};

export const customerTokenView = (customer) => {
  return {
    id: customer.id,
    email: customer.email,
    role: customer.role,
  };
};
