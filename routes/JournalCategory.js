module.exports = (app) => {
  const { expressjwt: jwt } = require('express-jwt');
  const journalCategory = require('../controllers/JournalCategoryController');
  const {PostValidator} = require('../middleware/validators/journalCategory')
  var router = require('express').Router();
  const jwtCheck = jwt({ secret: process.env.APP_SECRET_TOKEN, algorithms: ["HS256"]});
  // const jwtCheck = require('../middleware/auth/authenticate');

  //  Create a new journalCategory
  router.post('/', jwtCheck, PostValidator, journalCategory.createRecord);

  // Retrieve all journalCategory data
  router.get('/', jwtCheck, journalCategory.fetchRecords);

  // Retrieve journalCategory data
  router.get('/:id', jwtCheck, journalCategory.fetchRecord);

  // Update a journalCategory with id
  router.put('/:id', jwtCheck, journalCategory.updateRecord);

  // Delete a journalCategory with id
  router.delete('/:id', jwtCheck, journalCategory.deleteRecord);


  app.use('/api/journalCategories', router);
};
