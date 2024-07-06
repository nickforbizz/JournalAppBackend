const { expressjwt: jwt } = require('express-jwt');

// JWT Middleware
const jwtCheck = jwt({
  secret: process.env.APP_SECRET_TOKEN,
  algorithms: ['HS256'],
});
// Custom JWT middleware to handle errors
const jwtCheckWithCustomErrorHandling = (req, res, next) => {
  jwtCheck(req, res, (err) => {
    if (err) {
      if (err.name === 'UnauthorizedError') {
        // Check if the error is due to token expiration
        if (err.inner && err.inner.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json({ code: 'TOKEN_EXPIRED', message: 'Token has expired' });
        } else {
          return res
            .status(401)
            .json({ code: 'INVALID_TOKEN', message: 'Invalid token' });
        }
      }
      return res
        .status(500)
        .json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
    }
    next();
  });
};

module.exports = jwtCheckWithCustomErrorHandling;
