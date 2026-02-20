const express = require('express');
const router = express.Router();
const { mockJobs } = require('../data/mockJobs');
const auth = require('../middleware/auth');

// Create payment order (mock)
router.post('/create-order', auth, async (req, res) => {
  try {
    const { jobId } = req.body;
    
    const job = mockJobs.find(j => j._id === jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Mock payment order
    const order = {
      id: 'order_' + Date.now(),
      amount: job.estimatedPrice * 100, // Convert to paise/cents
      currency: 'INR',
      status: 'created'
    };

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment (mock)
router.post('/verify', auth, async (req, res) => {
  try {
    const { jobId, paymentId } = req.body;
    
    const job = mockJobs.find(j => j._id === jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update job payment status (mock)
    job.paymentStatus = 'paid';
    job.paymentMethod = 'online';

    res.json({ message: 'Payment verified successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment details (mock)
router.get('/:jobId', auth, async (req, res) => {
  try {
    const job = mockJobs.find(j => j._id === req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      jobId: job._id,
      amount: job.estimatedPrice,
      status: job.paymentStatus,
      method: job.paymentMethod
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
