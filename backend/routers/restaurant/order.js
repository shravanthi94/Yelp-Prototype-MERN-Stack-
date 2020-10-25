const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/resAuth');

// const Restaurant = require('../../models/RestaurantModel');
const Order = require('../../models/OrdersModel');

// @route  Get yelp/restaurant/orders
// @desc   restaurant get all orders route
// @access Private
router.get('/', auth, (req, res) => {
  const resId = req.user.id;
  try {
    const orders = Order.find({ restaurant: resId }).sort({ date: -1 });
    if (!orders) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No orders to display' }] });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Update yelp/restaurant/orders/status/1
// @desc   restaurant update to the status route
// @access Private
router.post(
  '/status/:order_id',
  [auth, [check('status', 'Order status is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      let orderType = '';
      if (status === 'Picked up' || status === 'Delivered') {
        orderType = 'Completed';
      }
      const order = await Order.findById(orderId);
      order.status = status;
      order.type = orderType;
      await order.save();

      res.status(200).send('Status updated');
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Get yelp/restaurant/orders/cancelorder
// @desc   restaurant update to recieved route
// @access Private
router.post('/cancelorder/:order_id', auth, async (req, res) => {
  const orderId = req.params.order_id;
  try {
    const order = await Order.findById(orderId);
    order.status = 'Cancelled';
    order.type = 'Cancelled';
    await order.save();

    res.status(200).send('Order has been cancelled');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
