import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all notifications', data: [] });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'Get notification by id', data: null });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create notification', data: null });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Update notification', data: null });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete notification' });
});

export default router;
