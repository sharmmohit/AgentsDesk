import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      provider: 'local',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // Update last login
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
};

// @desc    Google OAuth callback
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (user) {
      // Update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.provider = 'google';
        await user.save();
      }
      // Update last login
      user.lastLogin = Date.now();
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        provider: 'google',
        isVerified: true,
      });
    }

    res.json({
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
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};