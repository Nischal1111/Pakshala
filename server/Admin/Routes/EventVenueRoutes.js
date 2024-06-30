const router = require('express').Router();

const jwtAuth = require('../Middleware/authMiddleware');


const {
   addBookVenue,
    getBookVenues
} = require('../Controllers/EventVenueControl');




//routes

router.post('/request-event-venue', addBookVenue);


router.get('/get-event-venues',jwtAuth ,getBookVenues);


module.exports = router;



