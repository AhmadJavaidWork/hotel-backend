import { Router } from 'express';
import { token } from '../services/passport';
import admin from './admin';
import users from './users';
import auth from './auth';
import customers from './customers';
import rooms from './rooms';
import bookings from './bookings';

const router = new Router();

router.use('/admin', token({ required: true, roles: ['admin'] }), admin);
router.use('/users', users);
router.use('/auth', auth);
router.use('/customers', customers);
router.use('/rooms', rooms);
router.use('/bookings', bookings);

export default router;
