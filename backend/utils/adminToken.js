const jwt = require('jsonwebtoken');

const createAdminToken = (res, id) => {
  const token = jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Admin token expires in 7 days
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('admin_token', token, {
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Token is valid for 7 days
  });
};

module.exports = createAdminToken;
