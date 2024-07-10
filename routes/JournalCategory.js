module.exports = (app) => {
  const { expressjwt: jwt } = require('express-jwt');
  const journalCategory = require('../controllers/JournalCategoryController');
  const {PostValidator} = require('../middleware/validators/journalCategory')
  var router = require('express').Router();
  const jwtCheck = jwt({ secret: process.env.APP_SECRET_TOKEN, algorithms: ["HS256"]});
  // const jwtCheck = require('../middleware/auth/authenticate');


  /**
 * @swagger
 * tags:
 *   name: JournalCategory
 *   description: The journalCategory managing API
 * /api/journalCategories:
 *   get:
 *     summary: Lists all the journalCategories
 *     tags: [JournalCategory]
 *     responses:
 *       200:
 *         description: The list of the journalCategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '/components/schemas/JournalCategoryComponent'
 *   post:
 *     summary: Create a new journalCategory
 *     tags: [JournalCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JournalCategoryComponent'
 *     responses:
 *       200:
 *         description: The created journalCategory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JournalCategoryComponent'
 *       500:
 *         description: Some server error
 * /api/journalCategories/{id}:
 *   get:
 *     summary: Get the journalCategory by id
 *     tags: [JournalCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journalCategory id
 *     responses:
 *       200:
 *         description: The journalCategory response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JournalCategoryComponent'
 *       404:
 *         description: The journalCategory was not found
 *   put:
 *    summary: Update the journalCategory by the id
 *    tags: [JournalCategory]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The journalCategory id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/JournalCategoryComponent'
 *    responses:
 *      200:
 *        description: The journalCategory was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/JournalCategoryComponent'
 *      404:
 *        description: The journalCategory was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the journalCategory by id
 *     tags: [JournalCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journalCategory id
 *
 *     responses:
 *       200:
 *         description: The journalCategory was deleted
 *       404:
 *         description: The journalCategory was not found
 */

  //  Create a new journalCategory
  router.post('/', jwtCheck, PostValidator, journalCategory.createRecord);

  // Retrieve all journalCategory data
  router.get('/', journalCategory.fetchRecords);

  // Retrieve journalCategory data
  router.get('/:id', jwtCheck, journalCategory.fetchRecord);

  // Update a journalCategory with id
  router.put('/:id', jwtCheck, journalCategory.updateRecord);

  // Delete a journalCategory with id
  router.delete('/:id', jwtCheck, journalCategory.deleteRecord);


  app.use('/api/journalCategories', router);
};
