// backend/utils/validation.js
const { validationResult, check } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

// Validate Signup
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name"),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Validate Login
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Song Validation
const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Song title is required'),
  check('url')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Audio is required')
]

// Album Validation
const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Album title is required'),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateSong,
  validateAlbum
};
