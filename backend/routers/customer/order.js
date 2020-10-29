const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/auth');

// const User = require('../../models/UserModel');
const Order = require('../../models/OrdersModel');
const Restaurant = require('../../models/RestaurantModel');

// @route  GET yelp/customer/orders/all
// @desc   Get all customer orders placed
// @access Private
router.get('/all', checkAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ customer: userId })
      .sort({ date: -1 })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!orders) {
      return res.status(400).json({ errors: [{ msg: 'No orders placed' }] });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  POST yelp/orders/customer/placeorder
// @desc   Place an order by current customer
// @access Private
router.post(
  '/placeorder',
  [
    checkAuth,
    [
      check('restaurantId', 'Restaurant ID is required').notEmpty(),
      check('deliveryOption', 'Select the delivery option').notEmpty(),
      check('item', 'Select an item').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customerId = req.user.id;
    const { item, deliveryOption, restaurantId } = req.body;

    try {
      const order = new Order({
        restaurant: restaurantId,
        customer: customerId,
        item,
        deliveryOption,
      });

      await order.save();
      res.status(200).send('Order has been placed');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
