const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is for a user
    if (decoded.userType !== 'user') {
      return res.status(403).json({ message: 'Not authorized as a user' });
    }
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = userAuth;