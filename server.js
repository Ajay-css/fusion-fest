const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const customerRoutes = require('./routes/customers');
const vendorRoutes = require('./routes/vendors');
const bookingRoutes = require('./routes/bookings');

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));