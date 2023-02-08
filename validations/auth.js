const { body } = require('express-validator');

const regValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

module.exports = regValidation;
