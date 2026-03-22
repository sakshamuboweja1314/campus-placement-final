// Users routes and validation
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/userController');

// Middleware to check validation errors
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg || 'Validation failed' });
  }
  next();
};

// Create user (simple validation shown)
router.post(
  '/',
  [body('name').isLength({ min: 1 }), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validationErrorHandler,
  controller.createUser
);

// Login user
router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validationErrorHandler,
  controller.loginUser
);

// Backward compatible alias for auth endpoint (frontend may use /api/auth/login)
router.post(
  '/auth/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validationErrorHandler,
  controller.loginUser
);

router.get('/', controller.getUsers);
router.get('/:id', [param('id').isMongoId()], controller.getUser);
router.put('/:id', [param('id').isMongoId()], controller.updateUser);
router.delete('/:id', [param('id').isMongoId()], controller.deleteUser);

module.exports = router;
