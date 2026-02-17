import { Router } from 'express';
import * as cpController from '../controllers/cpController';

import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', cpController.createCP);
router.get('/', cpController.getAllCPs);

export default router;
