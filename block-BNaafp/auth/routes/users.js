var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: "Users Information"});
});

// registration handler
router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// login handler
router.post('/login', async(req, res, next) => {
  const {email, password} = req.body;
  if(!email, !password) {
    res.status(400).json({error: "Email/Password required"});
  }
  try {
    const user = await User.findOne({email});
    if(!user) {
      res.status(400).json({error:"Email not registered"});
    }
    const result = await user.verifyPassword(password);
    if(!result) {
      res.status(400).json({message: "Password is incorrect"});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
