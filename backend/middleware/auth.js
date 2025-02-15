const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decodedToken; 
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser };
