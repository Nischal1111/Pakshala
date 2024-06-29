const express = require('express');
const router = express.Router();
const jwtAuth = require('../Middleware/authMiddleware');

const {
    createMenuRequest,
    getAllMenuOrders
} = require('../Controllers/MenuOrderControl');


//middleware
// router.use(jwtAuth);


//routes
//create menu order request
router.post('/request-order-menu', createMenuRequest);

//get all menu orders
router.get('/get-all-menu-orders', getAllMenuOrders);



module.exports = router;


