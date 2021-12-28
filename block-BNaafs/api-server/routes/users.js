const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ message: 'Users Information' });
});

/* Registration Handler */
router.post('/registration', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.signToken();
    res.status(201).json({ user: user.userJSON(token) });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* Login handler */
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email/Password required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email is not registered' });
    }
    const result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: 'Password is incorrect' });
    }
    // Generate Token
    const token = await user.signToken();
    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
