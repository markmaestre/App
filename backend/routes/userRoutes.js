
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { authenticateUser } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.put('/updateProfile', authenticateUser, upload.single('profileImage'), async (req, res) => {
  try {
    const { username, password, location, phone_number } = req.body;
    const userId = req.user.id;

    if (!username || !location || !phone_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.location = location;
    user.phone_number = phone_number;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

