const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/auth');

const Message = require('../../models/MessageModel');
const User = require('../../models/UserModel');
const Restaurant = require('../../models/RestaurantModel');

// @route  POST yelp/customer/message
// @desc   Customer reply message route
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
      //   const customerId = req.user.id;
      const messageId = req.params.id;

      const conversation = await Message.findById(messageId);
      conversation.messages.unshift({
        usertype: 'customer',
        text,
      });

      await conversation.save();

      res.status(200).send('Successfully sent the message');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  GET yelp/customer/message/all
// @desc   Get all customer conversations
// @access Private
router.get('/all', checkAuth, async (req, res) => {
  const customerId = req.user.id;
  try {
    const conversations = await Message.find({ customer: customerId })
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
    if (!conversations) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Conversations not found' }] });
    }
    res.status(200).json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/customer/message/all
// @desc   View each message conversation with a restaurant
// @access Private
router.get('/view/:id', checkAuth, async (req, res) => {
  const messageId = req.params.id;
  try {
    const conversation = await Message.findById(messageId);
    if (!conversation) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Conversation not found' }] });
    }
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
