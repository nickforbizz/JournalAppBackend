const {check} = require('express-validator');



const PostValidator = [
  check('title', 'username cannot be Empty').not().isEmpty(),
]

module.exports = {
  PostValidator
}