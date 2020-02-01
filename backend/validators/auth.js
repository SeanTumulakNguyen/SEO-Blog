const { check } = require('express-validator')

exports.userSignUpvalidator = [
    check('name').not()
        .isEmpty()
    .withMessage('Name is required'),
    check('email').not()
        .isEmail()
    .withMessage('Must be a valid email address'),
    check('password').not()
        .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),
]