module.exports = (app) => {
  var router = require('express').Router();

  const journal = require('../controllers/JournalController');
  const {PostValidator, UpdateValidator} = require('../middleware/validators/journals')
  const jwtCheckWithCustomErrorHandling = require('../middleware/auth/authenticate')

  // const jwtCheck = require('../middleware/auth/authenticate');

  //  Create a new journal
  router.post('/', jwtCheckWithCustomErrorHandling, PostValidator, journal.createRecord);

  // Retrieve all journal data
  router.get('/', journal.fetchRecords);

  // Retrieve journal data
  router.get('/:id', journal.fetchRecord);

  // Update a journal with id
  router.put('/:id', jwtCheckWithCustomErrorHandling, UpdateValidator, journal.updateRecord);  

  // Delete a journal with id
  router.delete('/:id', jwtCheckWithCustomErrorHandling, journal.deleteRecord);


  app.use('/api/journals', router);
};
