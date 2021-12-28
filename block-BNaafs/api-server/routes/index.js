const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

/* GET home page. */
router.get('/dashboard', auth.verifyToken, (req, res, next) => {
  res.json({ message: 'Welcome to dashboard' });
});

module.exports = router;
