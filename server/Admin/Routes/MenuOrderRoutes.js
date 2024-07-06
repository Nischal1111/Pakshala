const express = require('express');
const router = express.Router();
const jwtAuth = require('../Middleware/authMiddleware');

const {
    createMenuRequest,
    getAllMenuOrders,
    acceptMenuOrders,
    rejectMenuOrders
} = require('../Controllers/MenuOrderControl');


//middleware
// router.use(jwtAuth);


//routes
//create menu order request
router.post('/request-order-menu', createMenuRequest);

//get all menu orders
router.get('/get-all-menu-orders',jwtAuth, getAllMenuOrders);

// accept the order menu
router.route("/accept-order-menu" ).patch(jwtAuth,acceptMenuOrders)

// reject menu orders
router.route("/reject-order-menu").patch(jwtAuth,rejectMenuOrders)

module.exports = router;


