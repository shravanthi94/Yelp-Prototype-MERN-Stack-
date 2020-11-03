/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/auth');

const User = require('../../models/UserModel');

router.get('/:data', checkAuth, async (req, res) => {
  const { data } = req.params;
  const customerId = req.user.id;
  try {
    const users = await User.find({
      $or: [{ name: data }, { 'about.nickname': data }, { 'about.city': data }],
      _id: { $ne: customerId },
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
    const data = await User.findById(customerId).select('following');
    console.log(data);
    const users = await User.find({ _id: { $in: data.following } });
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
