// Example webhook endpoint for integration (e.g., Slack)
import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// POST /api/v1/integrations/slack
router.post('/slack', authenticate, authorize('admin', 'manager'), (req, res) => {
  // Here you would send a message to Slack using their API
  // For demo, just echo the payload
  res.status(200).json({ message: 'Slack webhook received', payload: req.body });
});

export default router;
