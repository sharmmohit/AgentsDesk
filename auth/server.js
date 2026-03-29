import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Debug: Check environment variables
console.log('📋 Environment Variables Check:');
console.log('PORT:', process.env.PORT || '5000');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Present' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Present' : '❌ Missing');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Present' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Present' : '❌ Missing');
console.log('----------------------------------------\n');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// Import routes
import authRoutes from './src/routes/authRoutes.js';

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    googleOAuth: !!process.env.GOOGLE_CLIENT_ID,
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`📍 Server file location: Root directory`);
});