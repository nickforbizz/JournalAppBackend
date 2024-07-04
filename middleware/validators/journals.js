const {check} = require('express-validator');



const PostValidator = [
  check('title', 'title cannot be Empty').not().isEmpty(),
  check('content', 'content cannot be Empty').not().isEmpty(),
  check('categoryId', 'categoryId cannot be Empty').not().isEmpty(),
]

module.exports = {
  PostValidator
}