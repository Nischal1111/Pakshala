const express = require('express');
const adminRoutes = express.Router();

const jwtAuth = require('../Middleware/authMiddleware');

const {
    addAdmin,
    adminLogin,
    refreshAccessToken,
    adminLogout
} = require('../Controllers/AdminControl');



// Add new admin
adminRoutes.route('/add-admin').post(addAdmin);

// Login admin
adminRoutes.route('/login-admin').post(adminLogin);


// ==> Secured Routes <==

// Refresh access token
adminRoutes.route('/refresh-token').post(refreshAccessToken);

//logout
adminRoutes.route('/logout-admin').post(jwtAuth ,adminLogout);

module.exports = adminRoutes;
