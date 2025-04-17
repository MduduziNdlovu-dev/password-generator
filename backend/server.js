const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// test uf api is working

app.get('/', (req,res) => {
    res.send('API is working');
})

//middleware section
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection section
mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log('MongoDB connection established successfully');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});