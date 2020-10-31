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

      const conversation = await Message.find({
        restaurant: restaurantId,
        customer: customerId,
      });

      if (!conversation) {
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
      } else {
        conversation.messages.unshift({
          usertype: 'restaurant',
          text,
        });

        await conversation.save();

        res.status(200).send('Successfully sent the message');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  GET yelp/restaurant/message/:customerId
// @desc   View conversations between customer & restaurant
// @access Private
router.get('/:customerId', async (req, res) => {
  const restaurantId = req.user.id;
  const { customerId } = req.params;
  try {
    const messages = await Message.find({
      restaurant: restaurantId,
      customer: customerId,
    });
    if (!messages) {
      return res.status(400).json({ errors: [{ msg: 'No messages found' }] });
    }
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
