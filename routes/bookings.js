const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get bookings for customer
router.get('/customer/:username', async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.username });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;