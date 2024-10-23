const http = require('http');
const mongoose = require('mongoose');
const url = require('url');
const cors = require('cors'); // Import CORS middleware
const express = require('express'); // Using express to simplify things

const app = express();
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event_finder_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the Event schema and model
const eventSchema = new mongoose.Schema({
    location: String,
    eventType: String,
    date: Date,
    description: String
});

const Event = mongoose.model('Event', eventSchema);

// Define a GET route to serve events
app.get('/events', async (req, res) => {
    const { location, eventType, date } = req.query;

    try {
        const query = {
            location: new RegExp(location, 'i'),
            eventType: new RegExp(eventType, 'i')
        };

        // If a date is provided, filter by that date
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1); // Get the next day for inclusive comparison

            query.date = {
                $gte: startDate,
                $lt: endDate
            };
        }

        const events = await Event.find(query);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});