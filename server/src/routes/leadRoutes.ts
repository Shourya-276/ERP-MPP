import { Router } from 'express';
import * as leadController from '../controllers/leadController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Lead Actions (Create is public for walk-ins/clients, but others need auth)
router.post('/', leadController.createLead);

// All other dashboard routes require authentication
router.use(authMiddleware);

router.get('/recent', leadController.getRecentLeads);
router.get('/stats', leadController.getReceptionistStats);

router.get('/search/:query', leadController.searchLeads);
router.get('/:friendlyId', leadController.getLeadByFriendlyId);
router.patch('/:friendlyId/revisit', leadController.updateToRevisit);
router.post('/:friendlyId/feedback', leadController.saveFeedback);

export default router;
