const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/resAuth');

const Message = require('../../models/MessageModel');

// @route  POST yelp/restaurant/message
// @desc   Restaurant new message route
// @access Private
router.post(
  '/',
  [
    checkAuth,
    [
      check('text', 'Message text is required').notEmpty(),
      check('customerId', 'Customer ID is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { text, customerId } = req.body;
      const restaurantId = req.user.id;
      const messages = [];
      const msgObj = {
        usertype: 'restaurant',
        text,
      };
      messages.push(msgObj);
      const newMessage = new Message({
        restaurant: restaurantId,
        customer: customerId,
        messages,
      });
      await newMessage.save();

      res.status(200).send('Successfully sent the message');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  POST yelp/restaurant/message/:id
// @desc   Restaurant reply message route
// @access Private
router.post(
  '/:id',
  [checkAuth, [check('text', 'Message text is required').notEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { text } = req.body;
      const messageId = req.params.id;

      const message = await Message.findById(messageId);
      message.messages.unshift({
        usertype: 'restaurant',
        text,
      });
      await message.save();
      res.status(200).send('Successfully sent the message');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
