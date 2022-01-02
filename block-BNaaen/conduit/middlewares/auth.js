const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        req.user = payload;
        return next();
      }
      res.status(400).json({ error: 'Token required' });
    } catch (error) {
      next(error);
    }
  },
};
