const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // install uuid: npm i uuid

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number
});

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true, default: () => uuidv4() }, // ✅ auto generate
  customer: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "Confirmed" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);