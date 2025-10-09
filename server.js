require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const chalk = require ("chalk");

const parentRoutes = require("./routes/verification/parentRoutes");
const userRoutes = require('./routes/userRoute'); 
const userVerify = require('./routes/verification/userVerify');

const bookRoute = require('./routes/admin/bookRoute');
const podcastRoute = require('./routes/admin/podcastRoute');
const paymentRoute = require('./routes/admin/paymentRoute');

const therapistRoutes = require('./routes/therapist/therapistRoute');
const parentRoute = require('./routes/parent/parentRoute');
const userRoute = require('./routes/user/userRoute');

const app = express();
const mongoUrl = process.env.MONGO_URL; 

app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl)
    .then(() => {
        console.log(chalk.green.bold("Connected to MongoDB Server"));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use('/api/users', userRoutes);

app.use("/api/parent", parentRoutes);
app.use("/api/verify/user", userVerify);

// for admin routes
app.use('/api/books', bookRoute);
app.use('/api/podcasts', podcastRoute);
app.use('/api/payments', paymentRoute);

// role based routes
app.use('/api/parent/dashboard', parentRoute);
app.use('/api/therapist', therapistRoutes);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(chalk.blue.bold(`Server is running on http://localhost:${PORT}`));
});
