const jwt = require('express-jwt');

// JWT Middleware
const jwtCheck = jwt({
  secret: process.env.APP_SECRET_TOKEN,
  algorithms: ['HS256'],
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
});

module.exports = jwtCheck;