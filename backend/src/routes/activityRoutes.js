import express from 'express';
import Activity from '../models/Activity.js';
import Lead from '../models/Lead.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { sendEmail, emailTemplate } from '../utils/mailer.js';

const router = express.Router();

router.get('/lead/:leadId', authenticate, async (req, res) => {
  try {
    const { leadId } = req.params;
    const activities = await Activity.findAll({ where: { leadId }, order: [['createdAt', 'ASC']] });
    res.status(200).json({ data: activities });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch timeline', error: err.message });
  }
});

// Get all activities (admin/manager can see all, sales only their own leads)
router.get('/', authenticate, async (req, res) => {
  try {
    let activities;
    if (req.user.role === 'sales') {
      // Only activities for leads owned by this user
      activities = await Activity.findAll({
        include: [{ model: Lead, where: { ownerId: req.user.id } }]
      });
    } else {
      activities = await Activity.findAll();
    }
    res.status(200).json({ data: activities });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activities', error: err.message });
  }
});

// Get activity by id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ data: activity });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activity', error: err.message });
  }
});

// Create activity (note, call, meeting, status_change)
router.post('/', authenticate, authorize('manager', 'sales'), async (req, res) => {
  try {
    const { type, content, leadId } = req.body;
    if (!type || !leadId) return res.status(400).json({ message: 'Type and leadId required' });
  const activity = await Activity.create({ type, content, leadId, userId: req.user.id });
  // Emit real-time notification
  try { require('../sockets/socketManager.js').getIO().emit('activityCreated', { activity }); } catch {}
  try { const lead = await Lead.findByPk(leadId); if (lead?.email) { await sendEmail({ to: lead.email, subject: 'Lead activity', html: emailTemplate('Lead activity', `${type}: ${content || ''}`) }) } } catch {}
  res.status(201).json({ data: activity });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create activity', error: err.message });
  }
});

// Update activity (only creator or manager/admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    if (req.user.role === 'sales' && activity.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await activity.update(req.body);
    res.status(200).json({ data: activity });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update activity', error: err.message });
  }
});

// Delete activity (admin/manager)
router.delete('/:id', authenticate, authorize('admin', 'manager'), async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    await activity.destroy();
    res.status(200).json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete activity', error: err.message });
  }
});

export default router;
