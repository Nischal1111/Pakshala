const router = require('express').Router();

const jwtAuth = require('../Middleware/authMiddleware');


const {
   addBookVenue,
    getBookVenues,
    acceptEventBooking,
    rejectEventBooking
} = require('../Controllers/EventVenueControl');




//routes

router.post('/request-event-venue', addBookVenue);


router.get('/get-event-venues',jwtAuth ,getBookVenues);

router.patch("/accept-event-booking/:eventId",acceptEventBooking);

router.patch("/reject-event-booking/:eventId",rejectEventBooking);

module.exports = router;



