
const BookVenue = require('../Schemas/BookVenue');


// Add a new venue booking request

const addBookVenue = async (req, res) => {
    try {
        const { name, contact, email, message } = req.body;

        const bookVenue = new BookVenue({
            name,
            contact,
            email,
            message,
        });

        const book = await bookVenue.save();

        if (!book) {
            return res.status(400).json({ success: false, message: 'Venue booking failed' });
        }

        res.status(201).json({ success: true, message: 'Venue booking request sent successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Add venue booking request', error: error });
    }
}


// Get all the venue booking requests

const getBookVenues = async (req, res) => {
    try {
        const books = await BookVenue.find();
        if (!books) {
            return res.status(404).json({ message: 'No venue booking requests found' });
        }
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get venue booking requests', error: error });
    }
}

module.exports = {
    addBookVenue,
    getBookVenues
}