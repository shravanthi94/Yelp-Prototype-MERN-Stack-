/* eslint-disable object-curly-newline */
const express = require('express');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//  Get the Restaurant mongoose model
const Restaurant = require('../../models/RestaurantModel');

// @route  POST yelp/restaurant/register
// @desc   Restaurant SIGNUP route
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail().notEmpty(),
    check('password', 'Password must be 8 characters long.')
      .isLength({
        min: 4,
      })
      .notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 1. See if Restaurant exists
      const restaurant = await Restaurant.findOne({ email });

      if (!restaurant) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // 2. Match restaurant's password matches
      const isMatch = await bcrypt.compare(password, restaurant.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // 3. return jsonWebToken
      const payload = {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email,
          usertype: 'restaurant',
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '10 hours' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            id: restaurant.id,
            name: restaurant.name,
            email: restaurant.email,
          });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  },
);

module.exports = router;
