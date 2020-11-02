const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/resAuth');

const Message = require('../../models/MessageModel');
const User = require('../../models/UserModel');
const Restaurant = require('../../models/RestaurantModel');

// @route  POST yelp/restaurant/message
// @desc   Restaurant new message route
// @access Private
router.post(
  '/:customerId',
  [checkAuth, [check('text', 'Message text is required').notEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { text } = req.body;
      const { customerId } = req.params;
      const restaurantId = req.user.id;

      const conversation = await Message.find({
        restaurant: restaurantId,
        customer: customerId,
      });

      if (conversation.length === 0) {
        const message = {};
        message.usertype = 'restaurant';
        message.text = text;

        const newMessage = new Message({
          restaurant: restaurantId,
          customer: customerId,
        });

        newMessage.messages.push(message);

        await newMessage.save();

        res.status(200).send('Successfully sent the message');
      } else {
        conversation[0].messages.push({
          usertype: 'restaurant',
          text,
        });

        await conversation[0].save();

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
router.get('/:customerId/:restaurantId', async (req, res) => {
  const { customerId, restaurantId } = req.params;
  try {
    const messages = await Message.find({
      restaurant: restaurantId,
      customer: customerId,
    })
      .populate({
        path: 'customer',
        select: 'name',
        model: User,
      })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!messages) {
      return res.status(400).json({ errors: [{ msg: 'No messages found' }] });
    }
    res.status(200).json(messages[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
