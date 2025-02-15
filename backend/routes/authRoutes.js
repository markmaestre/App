const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, email, location, phone_number, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

   
    const newUser = new User({
      username,
      email,
      location,
      phone_number,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },  
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    
    res.status(200).json({
      message: 'Login successful',
      token,    
      role: user.role  
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


router.get('/stats', async (req, res) => {
  try {
    
    const activeUsersCount = await User.countDocuments({ role: 'user', is_active: true });

   
    const newSignupsCount = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({
      activeUsersCount,
      newSignupsCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});


module.exports = router;
