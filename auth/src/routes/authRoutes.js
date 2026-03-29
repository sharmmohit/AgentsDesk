import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

console.log('🔍 Auth Routes - Google OAuth Status:');
console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID ? '✅ Present' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', GOOGLE_CLIENT_SECRET ? '✅ Present' : '❌ Missing');

if (
  GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET &&
  !GOOGLE_CLIENT_ID.includes('your_actual') &&
  !GOOGLE_CLIENT_SECRET.includes('your_actual')
) {
  console.log('✅ Configuring Google OAuth Strategy...');

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('📧 Google Profile:', profile.emails[0]?.value);

          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos?.[0]?.value || '👤',
              provider: 'google',
              isVerified: true,
            });
            console.log('🆕 New user created from Google');
          } else if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = 'google';
            await user.save();
            console.log('🔗 Google account linked to existing user');
          }

          user.lastLogin = Date.now();
          await user.save();

          return done(null, user);
        } catch (error) {
          console.error('❌ Google OAuth Error:', error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  router.use(passport.initialize());
  router.use(passport.session());

  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/?error=oauth_failed` }),
    (req, res) => {
      const token = generateToken(req.user._id);
      res.redirect(
        `${FRONTEND_URL}/?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
            provider: req.user.provider,
          })
        )}`
      );
    }
  );
} else {
  console.log('⚠️  Google OAuth not configured');

  router.get('/google', (req, res) => {
    res.status(501).json({ message: 'Google OAuth not configured' });
  });

  router.get('/google/callback', (req, res) => {
    res.status(501).json({ message: 'Google OAuth not configured' });
  });
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, provider: 'local' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      user.lastLogin = Date.now();
      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile placeholder
router.get('/profile', (req, res) => {
  res.json({ message: 'Protected route - implement auth middleware' });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;