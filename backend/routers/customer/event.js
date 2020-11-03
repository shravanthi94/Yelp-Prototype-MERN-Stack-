/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/auth');

const Event = require('../../models/EventModel');

// @route  POST yelp/events/register
// @desc   Register for an event
// @access Public
router.post('/:event_id', checkAuth, async (req, res) => {
  const eventId = req.params.event_id;
  const customerId = req.user.id;
  try {
    console.log(customerId);
    const event = await Event.findById(eventId);

    if (!event.customer.includes(customerId)) {
      event.customer.push(customerId);
    } else {
      return res.status(400).json({ errors: [{ msg: 'Already registered.' }] });
    }

    await event.save();

    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/customer/event
// @desc   Display all events registered by current customer
// @access Public
router.get('/', checkAuth, async (req, res) => {
  const customerId = req.user.id;
  try {
    const events = await Event.find({ customer: { $all: [customerId] } });

    if (!events) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Not registered for any events.' }] });
    }

    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
