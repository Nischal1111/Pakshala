const router = require('express').Router();

const jwtAuth = require('../Middleware/authMiddleware');

const {
    addTableReserve,
    getTableReserves
} = require('../Controllers/TableReserveControl');




//routes
router.post('/request-table-reserve/:id', addTableReserve);


router.get('/get-table-reserves', jwtAuth, getTableReserves);



module.exports = router;