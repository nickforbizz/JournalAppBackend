module.exports = (app) => {
  const { expressjwt: jwt } = require('express-jwt');
  const user = require('../controllers/UserController');
  const {RegistrationValidator} = require('../middleware/validators/user')
  var router = require('express').Router();
  const jwtCheck = jwt({ secret: process.env.APP_SECRET_TOKEN, algorithms: ["HS256"]});
  // const jwtCheck = require('../middleware/auth/authenticate');

  //  Create a new User
  router.post('/', jwtCheck, RegistrationValidator, user.createRecord);

  // login User
  // router.post('/login', user.auth);

  // Retrieve all user data
  router.get('/', jwtCheck, user.fetchRecords);

  // Retrieve user data
  router.get('/:id', user.fetchRecord);

  // Update a User with id
  router.put('/:id', user.updateRecord);

  // Delete a User with id
  router.delete('/:id', user.deleteRecord);


  app.use('/api/users', router);
};
