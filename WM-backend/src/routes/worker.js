const express = require('express');
const router = express.Router();
const { mockWorkers, getCurrentWorker } = require('../data/mockWorkers');
const auth = require('../middleware/auth');

// Get worker profile
router.get('/profile', auth, async (req, res) => {
  try {
    const worker = mockWorkers.find(w => w._id === req.worker.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update worker profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, skills, services, address, bio, hourlyRate } = req.body;
    
    const workerIndex = mockWorkers.findIndex(w => w._id === req.worker.id);
    if (workerIndex === -1) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    // Update worker data
    mockWorkers[workerIndex] = {
      ...mockWorkers[workerIndex],
      name: name || mockWorkers[workerIndex].name,
      email: email || mockWorkers[workerIndex].email,
      skills: skills || mockWorkers[workerIndex].skills,
      services: services || mockWorkers[workerIndex].services,
      address: address || mockWorkers[workerIndex].address,
      bio: bio || mockWorkers[workerIndex].bio,
      hourlyRate: hourlyRate || mockWorkers[workerIndex].hourlyRate,
      updatedAt: new Date()
    };
    
    res.json(mockWorkers[workerIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle online status
router.patch('/availability', auth, async (req, res) => {
  try {
    const workerIndex = mockWorkers.findIndex(w => w._id === req.worker.id);
    if (workerIndex === -1) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    mockWorkers[workerIndex].isOnline = !mockWorkers[workerIndex].isOnline;
    
    res.json({ isOnline: mockWorkers[workerIndex].isOnline });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update location
router.patch('/location', auth, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    
    const workerIndex = mockWorkers.findIndex(w => w._id === req.worker.id);
    if (workerIndex === -1) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    mockWorkers[workerIndex].location = {
      latitude,
      longitude
    };
    
    res.json({ location: mockWorkers[workerIndex].location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get earnings
router.get('/earnings', auth, async (req, res) => {
  try {
    const worker = mockWorkers.find(w => w._id === req.worker.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker.earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update push token (not needed for mock)
router.patch('/push-token', auth, async (req, res) => {
  try {
    res.json({ message: 'Push token updated (mock)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get nearby workers (for admin/customer use) - mock
router.get('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    // Return all online verified workers for demo
    const workers = mockWorkers.filter(w => w.isOnline && w.isVerified);
    
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
