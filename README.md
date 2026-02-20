# WorkMitra

<p align="center">
  <img src="./assets/logo.png" alt="WorkMitra Logo" width="200"/>
  <br/>
  <i>Connect with skilled workers, anytime, anywhere</i>
</p>

---

## 📱 Project Overview

WorkMitra is a gig economy mobile application built with React Native that connects skilled workers with people who need temporary work done. Similar to Rapido/Uber services, but for diverse life skills - from plumbers and electricians to drivers and daily wage workers.

**Current Focus:** Worker App only (WM-frontend)

---

## 🏗️ Repository Structure

| Repository | Description |
|------------|-------------|
| [WM-frontend](https://github.com/yourusername/WM-frontend) | React Native mobile app for workers |
| [WM-backend](https://github.com/yourusername/WM-backend) | Node.js/Express API server |

```
WM-frontend/           # React Native Worker App (Expo)
WM-backend/           # Node.js API Server
```

---

## 🎯 Worker App Features

| Feature | Description |
|---------|-------------|
| 👤 **Profile Management** | Create and manage professional profile with skills, photos, certifications |
| ✅ **Job Acceptance** | Accept, reject, or negotiate service requests |
| 🗺️ **Navigation** | Turn-by-turn directions to customer location |
| 💰 **Earnings Dashboard** | Track daily, weekly, monthly earnings |
| 🟢 **Availability Toggle** | Set online/offline status |
| ⭐ **Ratings View** | View customer ratings and feedback |
| 📊 **Job History** | Access past completed jobs and earnings |
| 🔔 **Notifications** | Receive instant job alerts and updates |

---

## 🛠️ Service Categories

### Primary Services

| Category | Examples |
|----------|----------|
| 🔧 **Home Repair** | Plumber, Electrician, Carpenter, Painter |
| 🚗 **Automotive** | Mechanic, Car Washer, Battery Technician, Towing |
| 🚕 **Transportation** | Driver (hourly/daily), Taxi Service |
| 🏠 **Household** | House Helper, Cook, Gardener, Security Guard |
| 💪 **Labor** | Daily Wage Workers, Movers, Construction Helpers |
| 🎨 **Professional** | Tailor, Photographer, Event Decorator |
| 💻 **Tech Support** | Computer Repair, WiFi Setup, TV Installation |

---

## 💻 Technology Stack

### Frontend (Mobile)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Context API
- **Navigation**: React Navigation
- **Maps**: Google Maps / Mapbox
- **UI Components**: React Native Paper / Custom Components

### Backend - Recommended: Node.js + Firebase

For a gig economy platform like WorkMitra requiring real-time features (live tracking, instant notifications, chat), I strongly recommend:

| Component | Technology | Why? |
|-----------|------------|------|
| **Runtime** | Node.js | Excellent for real-time, event-driven apps |
| **Framework** | Express.js | Minimal, fast, huge ecosystem |
| **Database** | MongoDB + Firebase Firestore | Flexible schema, handles high volume |
| **Real-time** | Socket.io + Firebase Realtime | Instant worker-customer communication |
| **Auth** | Firebase Auth | Ready-made OTP, social login, secure |
| **Push Notifications** | Firebase FCM | Reliable, free, cross-platform |
| **Cloud Functions** | Firebase Cloud Functions | Serverless, auto-scaling, cost-effective |
| **Payments** | Razorpay (India) / Stripe (Global) | Best regional support |
| **Storage** | Firebase Storage | Image/video uploads for profiles |

**Why Node.js + Firebase?**
- Firebase handles auth, push notifications, and real-time databases out-of-box
- Reduces development time by 40-50%
- Built-in scaling for high traffic
- Free tier is generous for startups

**Alternative:** Pure Node.js + MongoDB + Socket.io (if you need full control)

### Infrastructure
- **Primary Cloud**: Firebase (recommended for faster development)
  - Firebase Auth, Firestore, Cloud Functions, FCM, Storage
- **Alternative**: AWS (EC2, RDS, S3, SNS)
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Storage**: Firebase Storage / AWS S3
- **Maps API**: Google Maps Platform

---

## 🔐 Authentication & Security

- Phone number verification (OTP)
- Email/password authentication
- Role-based access control (Customer, Worker, Admin)
- Secure payment tokenization
- Data encryption at rest and in transit

---

## 📊 Key Workflows

### Customer Flow
```
1. Sign Up/Login → 2. Select Service Category → 3. Choose Worker → 
4. Schedule Booking → 5. Make Payment → 6. Track Worker → 
7. Service Completion → 8. Rate & Review
```

### Worker Flow
```
1. Sign Up/Verification → 2. Set Skills & Profile → 3. Go Online → 
4. Receive Job Request → 5. Accept Job → 6. Navigate to Location → 
7. Complete Service → 8. Get Paid → 9. Receive Rating
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- React Native CLI
- MongoDB (local or Atlas)
- Google Maps API Key

### Installation Commands

Run these commands in your terminal/command prompt:

**1. Install Frontend Dependencies:**
```
bash
cd c:\My Projects\WorkMitra\WM-frontend
npm install
```

**2. Install Backend Dependencies:**
```
bash
cd c:\My Projects\WorkMitra\WM-backend
npm install
```

### Configuration

**1. Copy the environment file:**
```
bash
cd c:\My Projects\WorkMitra\WM-backend
copy .env.example .env
```

**2. Edit `.env` with your actual values:**
```
# WM-backend/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
FCM_SERVER_KEY=your_fcm_key
```

### Running the App

**1. Start Backend Server:**
```
bash
cd c:\My Projects\WorkMitra\WM-backend
npm run dev
```

**2. Start Frontend App (in new terminal):**
```
bash
cd c:\My Projects\WorkMitra\WM-frontend
npx expo start
```

---

## 📱 App Screenshots

*(Screenshots will be added here)*

---

## 🔄 Future Enhancements

- [ ] Multi-language support
- [ ] Worker verification system (background checks)
- [ ] In-app wallet system
- [ ] Subscription plans for frequent users
- [ ] Emergency SOS feature
- [ ] Live chat support
- [ ] Worker loyalty programs
- [ ] Corporate/B2B service contracts

---

## 📄 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Services
- `GET /api/services` - List all service categories
- `GET /api/services/:id/workers` - Get workers by service

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `PATCH /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Worker
- `GET /api/worker/profile` - Get worker profile
- `PUT /api/worker/profile` - Update worker profile
- `GET /api/worker/earnings` - Get earnings data
- `PATCH /api/worker/availability` - Toggle availability

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Support

For any queries or support, please reach out to:
- Email: support@workmitra.com
- Website: www.workmitra.com

---

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ for the gig economy revolution
</p>
