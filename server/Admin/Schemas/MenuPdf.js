const mongoose = require('mongoose')

const pdfMenuSchema = new mongoose.Schema({
    menu_url: {
        type: String,
        required: true
    },
    menu_public_id: {
        type: String,
        required: true
    },
    menu_type: {
        type: String,
        required: true
    }
},{
    timestamps: true
});



const MenuPdf = mongoose.model('MenuPdf', pdfMenuSchema);

module.exports = MenuPdf;
