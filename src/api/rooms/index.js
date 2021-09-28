import { Router } from 'express';
import { getAvailableRooms } from './controller';

const router = new Router();

router.get('/available-rooms', getAvailableRooms);

export default router;
