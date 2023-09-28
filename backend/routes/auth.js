const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser, 
        logout,
        getUserProfile, 
        updatePassword
    } = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

module.exports = router;