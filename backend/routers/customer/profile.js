const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/auth');

const User = require('../../models/UserModel');

// @route  GET yelp/customer/profile
// @desc   Get current customer profile details
// @access Private
router.get('/', checkAuth, async (req, res) => {
  try {
    const customer = await User.findById(req.user.id).select('-password');

    if (!customer) {
      return res.status(400).json({ msg: 'User not found.' });
    }

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/customer/profile/customer_id
// @desc   Get customer profile details using customer id
// @access Public
router.get('/display/:customer_id', async (req, res) => {
  const customerId = req.params.customer_id;

  try {
    const customer = await User.findById(customerId).select('-password');

    if (!customer) {
      return res.status(400).json({ msg: 'User not found.' });
    }

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Update yelp/customer/profile/basic
// @desc   Update current user basic details
// @access Private
router.post(
  '/basic',
  [checkAuth, [check('name', 'Customer name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customerId = req.user.id;
    const {
      name,
      dateOfBirth,
      city,
      state,
      country,
      nickName,
      headline,
    } = req.body;

    try {
      const customer = await User.findById(customerId).select('-password');
      customer.name = name;
      customer.about.dob = dateOfBirth;
      customer.about.city = city;
      customer.about.state = state;
      customer.about.country = country;
      customer.about.nickname = nickName;
      customer.about.headline = headline;

      await customer.save();

      res.json(customer);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Update yelp/customer/profile/about
// @desc   Update current user about details
// @access Private
router.post('/about', checkAuth, async (req, res) => {
  const customerId = req.user.id;
  const {
    thingsILove,
    findMeIn,
    myBlog,
    whenNotYelping,
    whyReadMyReviews,
    recentDiscovery,
  } = req.body;

  try {
    const customer = await User.findById(customerId).select('-password');
    customer.about.thingsILove = thingsILove;
    customer.about.findMeIn = findMeIn;
    customer.about.myBlog = myBlog;
    customer.about.notYelping = whenNotYelping;
    customer.about.whyMyReviews = whyReadMyReviews;
    customer.about.discovery = recentDiscovery;

    await customer.save();

    res.json(customer);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Update yelp/customer/profile/contact
// @desc   Update current user contact details
// @access Private
router.post(
  '/contact',
  [checkAuth, check('email', 'Email is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customerId = req.user.id;
    const { email, phone } = req.body;

    try {
      const customer = await User.findById(customerId).select('-password');
      customer.email = email;
      customer.phone = phone;

      await customer.save();

      res.json(customer);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Update yelp/customer/profile/reviews/:res_id
// @desc   Add a review to a restaurant
// @access Private
router.post(
  '/reviews/:res_id',
  [
    checkAuth,
    [
      check('rating', 'Rating is required').notEmpty(),
      check('text', 'Review is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customerId = req.user.id;
    const restaurant = req.params.res_id;
    const { rating, text } = req.body;
    const date = new Date();

    try {
      const customer = await User.findById(customerId).select('-password');
      //   Check if restaurant ID is invalid
      const newReview = {
        restaurant,
        rating,
        text,
        date,
      };

      customer.reviews.unshift(newReview);

      await customer.save();

      res.json(customer);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
