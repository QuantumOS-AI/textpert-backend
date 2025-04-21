const express = require('express');
const registerUser = require('../controllers/registerController.js');
const loginUser = require('../controllers/loginController.js');
const changePassword = require('../controllers/changePasswordController.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', changePassword);

module.exports = router;
