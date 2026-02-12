import { Router } from 'express';
import * as cpController from '../controllers/cpController';

const router = Router();

router.post('/', cpController.createCP);
router.get('/', cpController.getAllCPs);

export default router;
