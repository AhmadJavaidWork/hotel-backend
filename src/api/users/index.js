import { Router } from 'express';
import { master, token } from '../../services/passport';
import { register, update, updatePassword, getUserDetails } from './controller';
import {
  userValidations,
  userUpdateValidations,
  userPasswordUpdateValidations,
  checkUserUpdatingHimself,
  checkUserExists,
} from './helpers';
import { validator } from '../../utils/helpers';

const router = new Router();

router.post(
  '/register',
  master(),
  userValidations,
  validator,
  checkUserExists,
  register
);

router.put(
  '/:id',
  token({ required: true }),
  userUpdateValidations,
  validator,
  checkUserUpdatingHimself,
  update
);

router.post(
  '/password',
  token({ required: true }),
  userPasswordUpdateValidations,
  validator,
  updatePassword
);

router.get('/details', token({ required: true }), getUserDetails);

export default router;
