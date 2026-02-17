import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware';

const router = Router();

// Auth
router.post('/login', (req, res) => adminController.login(req, res));

// Lead Management - Protected by Admin Auth
router.use(authMiddleware, adminOnly);

router.get('/leads', (req, res) => adminController.getAllLeads(req, res));
router.get('/leads/:friendlyId', (req, res) => adminController.getLeadDetails(req, res));
router.delete('/leads/:friendlyId', (req, res) => adminController.deleteLead(req, res));

export default router;
