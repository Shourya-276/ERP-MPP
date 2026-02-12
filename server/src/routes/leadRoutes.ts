import { Router } from 'express';
import * as leadController from '../controllers/leadController';

const router = Router();

// Dashboard data
router.get('/recent', leadController.getRecentLeads);

// Lead Actions
router.post('/', leadController.createLead);
router.get('/:friendlyId', leadController.getLeadByFriendlyId);
router.patch('/:friendlyId/revisit', leadController.updateToRevisit);

export default router;
