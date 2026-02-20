// Mock Job Data
// This file contains static data to simulate database records

const mockJobs = [
  {
    _id: 'job_001',
    customerId: 'customer_001',
    workerId: null,
    serviceType: 'Plumbing Repair',
    category: 'Plumbing',
    description: 'Leaking faucet in kitchen needs repair. Water dripping constantly from the tap.',
    estimatedPrice: 75,
    finalPrice: null,
    status: 'pending',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    customerName: 'Sarah Johnson',
    customerPhone: '+1987654321',
    customerAddress: '100 Broadway, New York, NY 10005',
    location: {
      type: 'Point',
      coordinates: [-74.0134, 40.7074]
    },
    customerLocation: {
      latitude: 40.7074,
      longitude: -74.0134
    },
    workerLocation: null,
    rating: null,
    review: null,
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    startTime: null,
    endTime: null,
    notes: 'Please bring basic plumbing tools',
    createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 mins ago
  },
  {
    _id: 'job_002',
    customerId: 'customer_002',
    workerId: null,
    serviceType: 'Home Cleaning',
    category: 'Cleaning',
    description: 'Need full home cleaning for 2-bedroom apartment. Includes kitchen, bathrooms, and living areas.',
    estimatedPrice: 120,
    finalPrice: null,
    status: 'pending',
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    customerName: 'Michael Chen',
    customerPhone: '+1987654322',
    customerAddress: '250 Park Avenue, New York, NY 10177',
    location: {
      type: 'Point',
      coordinates: [-73.9750, 40.7549]
    },
    customerLocation: {
      latitude: 40.7549,
      longitude: -73.9750
    },
    workerLocation: null,
    rating: null,
    review: null,
    paymentStatus: 'pending',
    paymentMethod: 'upi',
    startTime: null,
    endTime: null,
    notes: 'Has a cat - please be careful with doors',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    _id: 'job_003',
    customerId: 'customer_003',
    workerId: 'worker_001',
    serviceType: 'Electrical Work',
    category: 'Electrical',
    description: 'Need to install new ceiling fan in master bedroom. Existing wiring available.',
    estimatedPrice: 150,
    finalPrice: null,
    status: 'accepted',
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    customerName: 'Emily Davis',
    customerPhone: '+1987654323',
    customerAddress: '500 5th Avenue, New York, NY 10110',
    location: {
      type: 'Point',
      coordinates: [-73.9836, 40.7549]
    },
    customerLocation: {
      latitude: 40.7549,
      longitude: -73.9836
    },
    workerLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      updatedAt: new Date()
    },
    rating: null,
    review: null,
    paymentStatus: 'pending',
    paymentMethod: 'card',
    startTime: null,
    endTime: null,
    notes: 'Please bring ladder if needed',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    _id: 'job_004',
    customerId: 'customer_004',
    workerId: 'worker_002',
    serviceType: 'Deep Cleaning',
    category: 'Cleaning',
    description: 'Post-renovation deep cleaning needed for 3-bedroom house. Construction debris already removed.',
    estimatedPrice: 250,
    finalPrice: 280,
    status: 'in_progress',
    scheduledTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    customerName: 'Robert Wilson',
    customerPhone: '+1987654324',
    customerAddress: '750 3rd Avenue, New York, NY 10017',
    location: {
      type: 'Point',
      coordinates: [-73.9722, 40.7549]
    },
    customerLocation: {
      latitude: 40.7549,
      longitude: -73.9722
    },
    workerLocation: {
      latitude: 40.6892,
      longitude: -73.9442,
      updatedAt: new Date()
    },
    rating: null,
    review: null,
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    endTime: null,
    notes: 'Focus on kitchen and bathrooms',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    _id: 'job_005',
    customerId: 'customer_005',
    workerId: 'worker_001',
    serviceType: 'Furniture Assembly',
    category: 'Assembly',
    description: 'Need help assembling IKEA PAX wardrobe system. All parts purchased and on-site.',
    estimatedPrice: 120,
    finalPrice: 120,
    status: 'completed',
    scheduledTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    customerName: 'Lisa Anderson',
    customerPhone: '+1987654325',
    customerAddress: '350 5th Avenue, New York, NY 10118',
    location: {
      type: 'Point',
      coordinates: [-73.9857, 40.7484]
    },
    customerLocation: {
      latitude: 40.7484,
      longitude: -73.9857
    },
    workerLocation: null,
    rating: 5,
    review: 'Excellent work! Very professional and completed quickly.',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 46 * 60 * 60 * 1000),
    notes: '',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000) // 3 days ago
  },
  {
    _id: 'job_006',
    customerId: 'customer_006',
    workerId: null,
    serviceType: 'Moving Service',
    category: 'Moving',
    description: 'Need help moving from 2nd floor apartment to ground floor. About 15-20 boxes plus furniture.',
    estimatedPrice: 200,
    finalPrice: null,
    status: 'pending',
    scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    customerName: 'David Brown',
    customerPhone: '+1987654326',
    customerAddress: '900 Lexington Avenue, New York, NY 10065',
    location: {
      type: 'Point',
      coordinates: [-73.9662, 40.7731]
    },
    customerLocation: {
      latitude: 40.7731,
      longitude: -73.9662
    },
    workerLocation: null,
    rating: null,
    review: null,
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    startTime: null,
    endTime: null,
    notes: 'Elevator available in both buildings',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  },
  {
    _id: 'job_007',
    customerId: 'customer_007',
    workerId: 'worker_002',
    serviceType: 'Cooking Service',
    category: 'Cooking',
    description: 'Need a chef for dinner party for 8 people. Indian cuisine preferred.',
    estimatedPrice: 300,
    finalPrice: 350,
    status: 'completed',
    scheduledTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    customerName: 'Jennifer Martinez',
    customerPhone: '+1987654327',
    customerAddress: '200 Central Park West, New York, NY 10024',
    location: {
      type: 'Point',
      coordinates: [-73.9740, 40.7812]
    },
    customerLocation: {
      latitude: 40.7812,
      longitude: -73.9740
    },
    workerLocation: null,
    rating: 5,
    review: 'Amazing food! Everyone loved it. Will definitely book again.',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    startTime: new Date(Date.now() - 26 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
    notes: 'Vegetarian options needed for 2 guests',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000) // 3 days ago
  }
];

module.exports = {
  mockJobs
};
