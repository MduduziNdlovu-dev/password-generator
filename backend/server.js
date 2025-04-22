const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));

//middleware section
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
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