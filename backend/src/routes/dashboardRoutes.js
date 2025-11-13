import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import Lead from '../models/Lead.js';

const router = express.Router();

// Dashboard stats (example: total leads, active, closed, revenue)
router.get('/stats', authenticate, async (req, res) => {
  try {
    const totalLeads = await Lead.count();
    const activeLeads = await Lead.count({ where: { status: 'active' } });
    const closedDeals = await Lead.count({ where: { status: 'closed' } });
    // Placeholder for revenue, assuming a 'revenue' field or similar
    const revenue = 0;
    res.status(200).json({
      data: { totalLeads, activeLeads, closedDeals, revenue }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
});


// Leads by status (for pie/bar chart)
router.get('/leads-by-status', authenticate, async (req, res) => {
  try {
    const statuses = ['new', 'active', 'closed'];
    const data = {};
    for (const status of statuses) {
      data[status] = await Lead.count({ where: { status } });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads by status', error: err.message });
  }
});

// Activities by type (for chart)
import Activity from '../models/Activity.js';
router.get('/activities-by-type', authenticate, async (req, res) => {
  try {
    const types = ['note', 'call', 'meeting', 'status_change'];
    const data = {};
    for (const type of types) {
      data[type] = await Activity.count({ where: { type } });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activities by type', error: err.message });
  }
});

// Leads by owner (for manager/admin)
import User from '../models/User.js';
router.get('/leads-by-owner', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'sales') return res.status(403).json({ message: 'Forbidden' });
    const users = await User.findAll();
    const data = [];
    for (const user of users) {
      const count = await Lead.count({ where: { ownerId: user.id } });
      data.push({ owner: user.name, count });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads by owner', error: err.message });
  }
});

export default router;
