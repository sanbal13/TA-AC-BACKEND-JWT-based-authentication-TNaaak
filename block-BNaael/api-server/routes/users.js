const express = require('express');

const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// handling Registration
router.post('/register', async (req, res, next) => {
  try {
    console.log('Inside Register');
    const user = await User.create(req.body);
    const token = await user.signToken();
    res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

// handling Login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email/Password required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    const result = await user.verifyPassword(password);

    if (!result) {
      return res.status(400).json({ error: 'Password is incorrect' });
    }
    const token = await user.signToken();
    return res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.get('/dashboard', auth.verifyToken, (req, res, next) => {
  res.json(req.user);
});

router.use(auth.verifyToken);
router.get('/protected', (req, res, next) => {
  res.json({ message: 'Inside Protected', user: req.user });
});
router.get('/protected-two', (req, res, next) => {
  res.json({ message: 'Inside Protected- two', user: req.user });
});

module.exports = router;
