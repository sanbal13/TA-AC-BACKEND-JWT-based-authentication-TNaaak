const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* Authentication */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email/password required' });
  }
  try {
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    const result = user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: 'Password id incorrect' });
    }
    const token = await user.signToken();
    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

/* Registration */
router.post('/', (req, res, next) => {

});

/* Get current User */
router.get('/', (req, res, next) => {

});

/* Update User */
router.put('/', (req, res, next) => {

});

module.exports = router;
