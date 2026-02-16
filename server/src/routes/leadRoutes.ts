import { Router } from 'express';
import * as leadController from '../controllers/leadController';

const router = Router();

// Dashboard data
router.get('/recent', leadController.getRecentLeads);
router.get('/stats', leadController.getReceptionistStats);

// Lead Actions
router.post('/', leadController.createLead);
router.get('/search/:query', leadController.searchLeads);
router.get('/:friendlyId', leadController.getLeadByFriendlyId);
router.patch('/:friendlyId/revisit', leadController.updateToRevisit);
router.post('/:friendlyId/feedback', leadController.saveFeedback);

export default router;
