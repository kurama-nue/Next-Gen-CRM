import express from 'express';

import Lead from '../models/Lead.js';
import Activity from '../models/Activity.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { getIO } from '../sockets/socketManager.js';
import { sendEmail, emailTemplate } from '../utils/mailer.js';

const router = express.Router();

// Get all leads (admin/manager can see all, sales only their own)
router.get('/', authenticate, async (req, res) => {
  try {
    let leads;
    if (req.user.role === 'sales') {
      leads = await Lead.findAll({ where: { ownerId: req.user.id } });
    } else {
      leads = await Lead.findAll();
    }
    res.status(200).json({ data: leads });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads', error: err.message });
  }
});

// Get lead by id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (req.user.role === 'sales' && lead.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.status(200).json({ data: lead });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lead', error: err.message });
  }
});

// Create lead (manager/sales)
router.post('/', authenticate, authorize('manager', 'sales'), async (req, res) => {
  try {
    const { name, email, status, ownerId } = req.body;
  const lead = await Lead.create({ name, email, status, ownerId: ownerId || req.user.id });
  await Activity.create({ type: 'note', content: 'Lead created', leadId: lead.id, userId: req.user.id });
  // Emit real-time notification
  try { getIO().emit('leadCreated', { lead }); } catch {}
  try { await sendEmail({ to: lead.email, subject: 'Lead created', html: emailTemplate('Lead created', `Lead <strong>${lead.name}</strong> created.`) }); } catch {}
  res.status(201).json({ data: lead });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create lead', error: err.message });
  }
});

// Update lead (owner or manager/admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (req.user.role === 'sales' && lead.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const prevStatus = lead.status;
    await lead.update(req.body);
    if (req.body.status && req.body.status !== prevStatus) {
      await Activity.create({ type: 'status_change', content: `Status changed to ${req.body.status}`, leadId: lead.id, userId: req.user.id });
    }
    try { getIO().emit('leadUpdated', { lead }); } catch {}
    try { if (req.body.status && req.body.status !== prevStatus) { await sendEmail({ to: lead.email, subject: 'Lead status updated', html: emailTemplate('Lead status updated', `Lead <strong>${lead.name}</strong> status changed to <strong>${req.body.status}</strong>`) }) } } catch {}
    res.status(200).json({ data: lead });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update lead', error: err.message });
  }
});

// Delete lead (admin/manager)
router.delete('/:id', authenticate, authorize('admin', 'manager'), async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    await lead.destroy();
    res.status(200).json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete lead', error: err.message });
  }
});

export default router;
