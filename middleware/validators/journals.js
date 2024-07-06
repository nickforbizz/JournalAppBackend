const { check } = require('express-validator');

const PostValidator = [
  check('title', 'title cannot be Empty').not().isEmpty(),
  check('content', 'content cannot be Empty').not().isEmpty(),
  check('categoryId', 'categoryId cannot be Empty').not().isEmpty(),
];

const UpdateValidator = [
  check('title', 'Title is required').not().isEmpty().isString(),

  check('content', 'Content must be a string').optional().isString(),

    check('categoryId', 'Category ID cannot be empty').not().isEmpty(),
    check('categoryId', 'Category ID must be an integer greater than 0').isInt({ min: 1 }),

    check('isPublished', 'isPublished must be a boolean').optional().isBoolean(),

    check('mood', 'Mood must be one of the following: happy, sad, neutral, excited, angry').optional().isIn(['happy', 'sad', 'neutral', 'excited', 'angry']),

    check('reminder', 'Reminder must be a valid date').optional().isISO8601(),

  // Add any other validations you need for your attributes
];

module.exports = {
  PostValidator,
  UpdateValidator,
};
