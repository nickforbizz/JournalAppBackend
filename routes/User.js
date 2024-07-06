module.exports = (app) => {
  var router = require('express').Router();
  const user = require('../controllers/UserController');
  const {RegistrationValidator} = require('../middleware/validators/user');
  const jwtCheckWithCustomErrorHandling = require('../middleware/auth/authenticate');

  //  Create a new User
  router.post('/', RegistrationValidator, user.createRecord);

  // Retrieve all user data
  router.get('/', user.fetchRecords);

  // Retrieve user data
  router.get('/:id', user.fetchRecord);

  // Update a User with id
  router.put('/:id', jwtCheckWithCustomErrorHandling, user.updateRecord);

  // Delete a User with id
  router.delete('/:id', jwtCheckWithCustomErrorHandling, user.deleteRecord);


  app.use('/api/users', router);
};
