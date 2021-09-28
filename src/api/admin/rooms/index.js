import { Router } from 'express';
import { getAll, getById, create, destroy, update } from './controller';
import { validator } from '../../../utils/helpers';
import { roomValidations } from './helpers';

const router = new Router();

router.get('/get-all', getAll);
router.get('/:id', getById);
router.post('/', roomValidations, validator, create);
router.delete('/:id', destroy);
router.put('/:id', roomValidations, validator, update);

export default router;
