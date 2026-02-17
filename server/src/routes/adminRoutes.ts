import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware';

const router = Router();

// Auth
router.post('/login', adminController.login);

// Lead Management - Protected by Admin Auth
router.use(authMiddleware, adminOnly);

router.get('/leads', adminController.getAllLeads);
router.get('/leads/:friendlyId', adminController.getLeadDetails);
router.delete('/leads/:friendlyId', adminController.deleteLead);

export default router;
