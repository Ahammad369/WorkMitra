// Mock Worker Data
// This file contains static data to simulate database records

const mockWorkers = [
  {
    _id: 'worker_001',
    name: 'John Smith',
    phone: '+1234567890',
    email: 'john.smith@email.com',
    password: '$2a$10$abcdefghijklmnopqrstuv', // hashed 'password123'
    skills: ['Plumbing', 'Electrical', 'Carpentry'],
    services: [
      { name: 'Plumbing Repair', category: 'Plumbing', price: 50, description: 'Basic plumbing repairs' },
      { name: 'Electrical Work', category: 'Electrical', price: 75, description: 'Electrical installations and repairs' },
      { name: 'Carpentry', category: 'Carpentry', price: 60, description: 'Wood work and furniture repair' }
    ],
    rating: 4.5,
    totalJobs: 127,
    isOnline: true,
    isVerified: true,
    address: '123 Main Street, New York, NY 10001',
    bio: 'Experienced handyman with 10+ years in home repairs',
    hourlyRate: 45,
    earnings: {
      daily: 150,
      weekly: 850,
      monthly: 3200,
      total: 38500
    },
    location: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date()
  },
  {
    _id: 'worker_002',
    name: 'Maria Garcia',
    phone: '+1234567891',
    email: 'maria.garcia@email.com',
    password: '$2a$10$abcdefghijklmnopqrstuv',
    skills: ['Cleaning', 'Cooking', 'Laundry'],
    services: [
      { name: 'Home Cleaning', category: 'Cleaning', price: 40, description: 'Full home cleaning service' },
      { name: 'Deep Cleaning', category: 'Cleaning', price: 80, description: 'Thorough deep cleaning' },
      { name: 'Cooking Service', category: 'Cooking', price: 55, description: 'Meal preparation' }
    ],
    rating: 4.8,
    totalJobs: 203,
    isOnline: true,
    isVerified: true,
    address: '456 Oak Avenue, Brooklyn, NY 11201',
    bio: 'Professional cleaning and cooking expert',
    hourlyRate: 35,
    earnings: {
      daily: 120,
      weekly: 680,
      monthly: 2800,
      total: 42000
    },
    location: {
      latitude: 40.6892,
      longitude: -73.9442
    },
    createdAt: new Date('2022-08-20'),
    updatedAt: new Date()
  },
  {
    _id: 'worker_003',
    name: 'Ahmed Hassan',
    phone: '+1234567892',
    email: 'ahmed.hassan@email.com',
    password: '$2a$10$abcdefghijklmnopqrstuv',
    skills: ['Moving', 'Heavy Lifting', 'Furniture Assembly'],
    services: [
      { name: 'Moving Service', category: 'Moving', price: 100, description: 'Full moving service' },
      { name: 'Furniture Assembly', category: 'Assembly', price: 45, description: 'Furniture assembly and installation' },
      { name: 'Heavy Lifting', category: 'Moving', price: 60, description: 'Help with heavy lifting' }
    ],
    rating: 4.3,
    totalJobs: 89,
    isOnline: false,
    isVerified: true,
    address: '789 Pine Road, Queens, NY 11375',
    bio: 'Strong and reliable moving helper',
    hourlyRate: 30,
    earnings: {
      daily: 90,
      weekly: 450,
      monthly: 1800,
      total: 15600
    },
    location: {
      latitude: 40.7282,
      longitude: -73.8317
    },
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date()
  }
];

// Current logged in worker (for demo purposes)
let currentWorker = null;

module.exports = {
  mockWorkers,
  currentWorker,
  setCurrentWorker: (worker) => { currentWorker = worker; },
  getCurrentWorker: () => currentWorker
};
