const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const { validateRegister, validateLogin, validateUpdateProfile } = require('../validators/auth'); // Asegúrate de que la ruta sea correcta
const { authMiddleware } = require('../middleware/auth');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, validateUpdateProfile, authController.updateProfile);
router.delete('/account', authMiddleware, authController.deleteAccount);

module.exports = router;