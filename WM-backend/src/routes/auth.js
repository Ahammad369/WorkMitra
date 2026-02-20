const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { mockWorkers, setCurrentWorker } = require('../data/mockWorkers');

// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory OTP storage (for demo purposes)
const otpStorage = {};

// Register new worker
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, skills } = req.body;

    // Check if worker already exists in mock data
    const existingWorker = mockWorkers.find(w => w.phone === phone);
    if (existingWorker) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Create new worker (in memory)
    const newWorker = {
      _id: `worker_${Date.now()}`,
      name,
      phone,
      email,
      password: password, // In production, hash this!
      skills: skills || [],
      services: [],
      rating: 0,
      totalJobs: 0,
      isOnline: true,
      isVerified: false,
      address: '',
      bio: '',
      hourlyRate: 0,
      earnings: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        total: 0
      },
      location: {
        latitude: 0,
        longitude: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockWorkers.push(newWorker);

    // Generate OTP (for demo, use 123456)
    const otp = '123456';
    otpStorage[phone] = otp;

    console.log(`OTP for ${phone}: ${otp}`); // For demo purposes

    res.status(201).json({
      message: 'Registration successful. Please verify OTP.',
      workerId: newWorker._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Verify OTP
    const storedOTP = otpStorage[phone];
    
    if (otp === storedOTP || otp === '123456') {
      const worker = mockWorkers.find(w => w.phone === phone);
      
      if (!worker) {
        return res.status(404).json({ error: 'Worker not found' });
      }

      worker.isVerified = true;
      setCurrentWorker(worker);

      const token = jwt.sign(
        { id: worker._id, role: 'worker' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Verification successful',
        token,
        worker: {
          id: worker._id,
          name: worker.name,
          phone: worker.phone,
          isVerified: worker.isVerified
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // For demo: accept any password for existing workers
    const worker = mockWorkers.find(w => w.phone === phone);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    // In production, verify password hash
    // For demo, accept 'password123' or any non-empty password
    if (!password || password.length < 1) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    setCurrentWorker(worker);

    const token = jwt.sign(
      { id: worker._id, role: 'worker' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        phone: worker.phone,
        isVerified: worker.isVerified,
        isOnline: worker.isOnline,
        rating: worker.rating
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send OTP for password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { phone } = req.body;

    const worker = mockWorkers.find(w => w.phone === phone);
    if (!worker) {
      return res.status(404).json({ error: 'Phone number not registered' });
    }

    // Generate OTP (for demo, use 123456)
    const otp = '123456';
    otpStorage[phone] = otp;

    console.log(`OTP for ${phone}: ${otp}`); // For demo purposes

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
