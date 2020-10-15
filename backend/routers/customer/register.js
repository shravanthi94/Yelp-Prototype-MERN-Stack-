const express = require('express');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { auth } = require('../../middleware/auth');

const router = express.Router();

//  Get the User mongoose model
const User = require('../../models/UserModel');

auth();

// @route  POST yelp/customer/register
// @desc   Customer SIGNUP route
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password must be 8 characters long.').isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //  1. Query to check if customer exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      //  3. Create user
      user = new User({
        name,
        email,
        password,
      });

      //  2. If customer does not exist, hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //  4. save to database
      await user.save();

      //  5. Pass the jsonwebtoken for that customer
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          usertype: 'customer',
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 6000000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            id: user.id,
            name: user.name,
            email: user.email,
          });
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
