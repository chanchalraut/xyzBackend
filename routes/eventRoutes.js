const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.post('/', async (req, res) => {
    const { title,   date, starttime, endtime, description } = req.body;
    try {
        const newEvent = new Event({ title,   date, starttime, endtime, description });
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;
