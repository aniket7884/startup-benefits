import express from 'express';

import { claimDeal, getMyClaims } from '../controllers/claimController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// Claim a deal
router.post('/', protect, claimDeal);

// Get my claimed deals
router.get('/my', protect, getMyClaims);

export default router;
