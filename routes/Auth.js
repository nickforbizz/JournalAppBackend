module.exports = (app) => {
    const user = require('../controllers/UserController');
    const {loginValidator} = require('../middleware/validators/user')
    var router = require('express').Router();
  
    router.post('/', loginValidator, user.auth);
  
    app.use('/api/auth', router);
  };
  