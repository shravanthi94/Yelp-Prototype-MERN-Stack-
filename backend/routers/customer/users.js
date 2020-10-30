/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/auth');

const User = require('../../models/UserModel');

router.get('/:data', checkAuth, async (req, res) => {
  const { data } = req.params;
  try {
    const users = await User.find({
      $or: [{ name: data }, { 'about.nickname': data }],
    }).select('-password');

    if (!users) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No users found with that name/nickname' }] });
    }

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const customerId = req.user.id;
  try {
    const customer = await User.findById(customerId);

    // if (
    //   customer.following.filter((each) => each.user.toString() === id).length >
    //   0
    // ) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: 'You are already following the user' }] });
    // }

    // customer.following.unshift({ customer: id });

    if (customer.following.includes(id)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'You are already following the user' }] });
    }

    customer.following.push(id);

    await customer.save();
    res.status(200).send('Successfully added to followers');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get('/following/all', checkAuth, async (req, res) => {
  const customerId = req.user.id;
  try {
    const following = await User.find(customerId).select('following');
    const users = await User.find({ _id: { $in: following } });
    if (!users) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'You are not following anyone.' }] });
    }

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
