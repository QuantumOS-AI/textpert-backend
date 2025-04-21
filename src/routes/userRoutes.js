const express = require('express');
const registerUser = require('../controllers/registerController.js');
const loginUser = require('../controllers/loginController.js');
const changePassword = require('../controllers/changePasswordController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { getCurrentUserProfile, updateUserProfile, updateUserCompany } = require('../controllers/userController.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', changePassword);
router.get('/me', authMiddleware, getCurrentUserProfile);
router.put('/me', authMiddleware, updateUserProfile);
router.put('/company', authMiddleware, updateUserCompany);

module.exports = router;
