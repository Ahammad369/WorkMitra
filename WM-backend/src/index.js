require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');
const jobRoutes = require('./routes/job');
const paymentRoutes = require('./routes/payment');

const app = express();
const server = http.createServer(app);

// Socket.io setup for real-time communication
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: MongoDB connection removed for static data mode
// In production, add back:
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/workmitra')

console.log('Running in STATIC DATA MODE (no MongoDB required)');

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_worker_room', (workerId) => {
    socket.join(`worker_${workerId}`);
    console.log(`Worker ${workerId} joined room`);
  });

  socket.on('join_customer_room', (customerId) => {
    socket.join(`customer_${customerId}`);
    console.log(`Customer ${customerId} joined room`);
  });

  socket.on('send_job_to_worker', (data) => {
    io.to(`worker_${data.workerId}`).emit('new_job', data.job);
  });

  socket.on('job_accepted', (data) => {
    io.to(`customer_${data.customerId}`).emit('job_status_update', {
      jobId: data.jobId,
      status: 'accepted',
      workerId: data.workerId
    });
  });

  socket.on('job_completed', (data) => {
    io.to(`customer_${data.customerId}`).emit('job_status_update', {
      jobId: data.jobId,
      status: 'completed'
    });
  });

  socket.on('location_update', (data) => {
    io.to(`customer_${data.customerId}`).emit('worker_location', {
      workerId: data.workerId,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WorkMitra API is running (Static Data Mode)' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
