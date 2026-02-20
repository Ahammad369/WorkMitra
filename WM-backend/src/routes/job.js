const express = require('express');
const router = express.Router();
const { mockJobs } = require('../data/mockJobs');
const { mockWorkers } = require('../data/mockWorkers');
const auth = require('../middleware/auth');

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

// Get available jobs for worker
router.get('/available', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    let jobs = mockJobs.filter(job => 
      job.status === 'pending' && !job.workerId
    );

    // If location provided, filter by proximity
    if (latitude && longitude) {
      jobs = jobs.filter(job => {
        if (!job.customerLocation) return true;
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          job.customerLocation.latitude,
          job.customerLocation.longitude
        );
        return distance <= parseFloat(radius);
      });
    }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get worker's jobs
router.get('/my-jobs', auth, async (req, res) => {
  try {
    const { status } = req.query;
    
    let jobs = mockJobs.filter(job => job.workerId === req.worker.id);
    
    if (status) {
      jobs = jobs.filter(job => job.status === status);
    }

    // Sort by createdAt descending
    jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept a job
router.post('/:id/accept', auth, async (req, res) => {
  try {
    const job = mockJobs.find(j => j._id === req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'pending') {
      return res.status(400).json({ error: 'Job is no longer available' });
    }

    job.workerId = req.worker.id;
    job.status = 'accepted';

    // Update worker's total jobs count
    const workerIndex = mockWorkers.findIndex(w => w._id === req.worker.id);
    if (workerIndex !== -1) {
      mockWorkers[workerIndex].totalJobs += 1;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start job
router.patch('/:id/start', auth, async (req, res) => {
  try {
    const job = mockJobs.find(j => j._id === req.params.id && j.workerId === req.worker.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.status = 'in_progress';
    job.startTime = new Date();

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete job
router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const job = mockJobs.find(j => j._id === req.params.id && j.workerId === req.worker.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.status = 'completed';
    job.endTime = new Date();

    // Update worker earnings
    const workerIndex = mockWorkers.findIndex(w => w._id === req.worker.id);
    if (workerIndex !== -1) {
      const price = job.estimatedPrice;
      mockWorkers[workerIndex].earnings.daily += price;
      mockWorkers[workerIndex].earnings.weekly += price;
      mockWorkers[workerIndex].earnings.monthly += price;
      mockWorkers[workerIndex].earnings.total += price;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel job
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const job = mockJobs.find(j => j._id === req.params.id && j.workerId === req.worker.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.status = 'cancelled';

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update location
router.patch('/:id/location', auth, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const job = mockJobs.find(j => j._id === req.params.id && j.workerId === req.worker.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.workerLocation = {
      latitude,
      longitude,
      updatedAt: new Date()
    };

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
