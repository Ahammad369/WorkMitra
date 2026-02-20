const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    sparse: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  services: [{
    name: String,
    category: String,
    price: Number,
    description: String
  }],
  aadharNumber: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalJobs: {
    type: Number,
    default: 0
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  earnings: {
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    monthly: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  pushToken: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for geospatial queries
workerSchema.index({ location: '2dsphere' });

// Hash password before saving
workerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
workerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get public profile
workerSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    phone: this.phone,
    profileImage: this.profileImage,
    skills: this.skills,
    services: this.services,
    rating: this.rating,
    totalJobs: this.totalJobs,
    isVerified: this.isVerified,
    hourlyRate: this.hourlyRate,
    address: this.address,
    bio: this.bio
  };
};

module.exports = mongoose.model('Worker', workerSchema);
