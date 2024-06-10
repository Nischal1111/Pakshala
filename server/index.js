// Mon Jun 10 8:49 PM 2024 (Saurav Karki)

const express = require('express');
const app = express();

const connectDB = require('./Database/ConnectDB');
connectDB();
const cors = require('cors');
require('dotenv').config()

port = process.env.PORT

//routes
const adminRoutes = require('./Admin/Routes/MenuRoutes');



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
    credentials: true,
}));

//routes
app.use('/admin', adminRoutes);

console.log(process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.send('Hello Pakshala.');
}
);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});