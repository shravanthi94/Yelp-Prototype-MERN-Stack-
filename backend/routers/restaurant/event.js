/* eslint-disable object-curly-newline */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/resAuth');

const Event = require('../../models/EventModel');
const User = require('../../models/UserModel');

// @route  GET yelp/restaurant/events
// @desc   Get all list of events sorted by date
// @access Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ eventDate: -1 });
    if (!events) {
      return res.status(400).json({ errors: [{ msg: 'No events found.' }] });
    }

    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/events/display/event_name
// @desc   Get events by event name
// @access Public
router.get('/display/:event_name', async (req, res) => {
  const eventName = req.params.event_name;
  try {
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      return res.status(400).json({ errors: [{ msg: 'No event found.' }] });
    }
    res.status(200).send(event);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  POST yelp/events
// @desc   Create an event
// @access Public
router.post(
  '/',
  [
    checkAuth,
    [
      check('name', 'Event name is required').notEmpty(),
      check('time', 'Event time is required').notEmpty(),
      check('date', 'Event date is required').notEmpty(),
      check('description', 'Event description is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurant = req.user.id;

    const { name, description, time, date, location, hashtags } = req.body;

    try {
      const event = new Event({
        restaurant,
        name,
        description,
        time,
        date,
        location,
        hashtags,
      });

      await event.save();

      res.status(200).json(event);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Get yelp/events/created/all
// @desc   Display all events created by current restaurant
// @access Public
router.get('/created', checkAuth, async (req, res) => {
  try {
    const events = await Event.find({ restaurant: req.user.id }).populate({
      path: 'customer',
      select: 'name',
      model: User,
    });

    if (!events) {
      return res.status(400).json({ errors: [{ msg: 'No events found.' }] });
    }

    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
