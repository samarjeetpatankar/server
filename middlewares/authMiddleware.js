const jwt = require('jsonwebtoken');
const config = require('../config');

exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
};

