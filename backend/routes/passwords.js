const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Password = require('../models/Password');

// Get all passwords
router.get('/', protect, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user });
    res.json(passwords);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Save a password
router.post('/', protect, async (req, res) => {
  const { title, passwordValue } = req.body;

  try {
    const newPassword = new Password({
      user: req.user,
      title,
      passwordValue
    });

    const savedPassword = await newPassword.save();
    res.json(savedPassword);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a password
router.delete('/:id', protect, async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password || password.user.toString() !== req.user)
      return res.status(401).json({ msg: 'Unauthorized' });

    await password.deleteOne();
    res.json({ msg: 'Password deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
