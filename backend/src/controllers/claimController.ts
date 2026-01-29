import { Response } from 'express';
import Claim from '../models/Claim';
import { AuthRequest } from '../middleware/authMiddleware';

// Claim a deal
export const claimDeal = async (req: AuthRequest, res: Response) => {
  try {
    const { dealsId } = req.body;

    if (!dealsId) {
      return res.status(400).json({ message: 'Deal ID required' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const exists = await Claim.findOne({
      user: req.user.id,
      dealsId,
    });

    if (exists) {
      return res.status(400).json({ message: 'Deal already claimed' });
    }

    const claimed = await Claim.create({
      user: req.user.id,
      dealsId,
    });

    res.status(201).json(claimed);
  } catch (error) {
    res.status(500).json({ message: 'Claim failed' });
  }
};

// Get all claims of logged-in user
export const getMyClaims = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const claims = await Claim.find({ user: req.user.id });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch claims' });
  }
};
