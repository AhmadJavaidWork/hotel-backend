import { Router } from 'express';
import { signIn, signOut } from './controller';
import {
  password,
  customerPassword,
  master,
  token,
  customerToken,
} from '../../services/passport';

const router = new Router();

router.post('/sign-in', master(), password(), signIn);
router.get('/sign-out', token({ required: true }), signOut);
router.post('/customer/sign-in', master(), customerPassword(), signIn);
router.get(
  '/customer/sign-out',
  customerToken({ required: true, roles: ['customer'] }),
  signOut
);

export default router;
