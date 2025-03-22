const jwt = require('jsonwebtoken');

const createToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });

  res.cookie('user_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Ensure this is correct
    sameSite: 'strict', // Consider setting this to 'lax' if issues persist
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

};

module.exports = createToken;
