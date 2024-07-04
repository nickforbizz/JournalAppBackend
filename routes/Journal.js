module.exports = (app) => {
  const { expressjwt: jwt } = require('express-jwt');
  const journal = require('../controllers/JournalController');
  const {PostValidator} = require('../middleware/validators/journals')
  var router = require('express').Router();
  const jwtCheck = jwt({ secret: process.env.APP_SECRET_TOKEN, algorithms: ["HS256"]});
  // const jwtCheck = require('../middleware/auth/authenticate');

  //  Create a new journal
  router.post('/', jwtCheck, PostValidator, journal.createRecord);

  // Retrieve all journal data
  router.get('/', jwtCheck, journal.fetchRecords);

  // Retrieve journal data
  router.get('/:id', jwtCheck, journal.fetchRecord);

  // Update a journal with id
  router.put('/:id', jwtCheck, journal.updateRecord);

  // Delete a journal with id
  router.delete('/:id', jwtCheck, journal.deleteRecord);


  app.use('/api/journals', router);
};
