import { body } from 'express-validator';
import { resStatuses } from '../../constants/response';
import queries from './queries';

export const userValidations = [
  body('firstName').isLength({ min: 3, max: 255 }),
  body('lastName').isLength({ min: 3, max: 255 }),
  body('email').isEmail(),
  body('email').isLength({ max: 255 }),
  body('password').isLength({ min: 8, max: 50 }),
  body('country').isLength({ min: 4, max: 80 }),
];

export const userUpdateValidations = [
  body('firstName').isLength({ min: 3, max: 255 }),
  body('lastName').isLength({ min: 3, max: 255 }),
  body('country').isLength({ min: 4, max: 80 }),
];

export const userPasswordUpdateValidations = [
  body('password').isLength({ min: 8, max: 50 }),
  body('newPassword').isLength({ min: 8, max: 50 }),
];

export const checkUserExists = async ({ body }, res, next) => {
  const { email } = body;
  const user = await queries.getUserByEmail(email);
  if (user) {
    return res
      .status(resStatuses.badRequest)
      .json({ success: false, message: 'User already exists' });
  }
  return next();
};

export const checkUserUpdatingHimself = async ({ params, user }, res, next) => {
  if (params.id != user.id) {
    return res.status(resStatuses.unAuthorized).json({
      success: false,
      message: `You cannot update someone else's data`,
    });
  }
  return next();
};

export const userView = (user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    country: user.country,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

export const userTokenView = (user) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};
