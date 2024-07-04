const {check} = require('express-validator');

const loginValidator = [
  check('email', 'Invalid request, Email cannot be Empty').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

const RegistrationValidator = [
  check('username', 'username cannot be Empty').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('firstName', 'firstName cannot be Empty').not().isEmpty(),
  check('password', 'password cannot be Empty').not().isEmpty(),
  check('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

module.exports = {
    loginValidator, RegistrationValidator
}