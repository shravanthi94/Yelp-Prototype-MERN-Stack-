const express = require('express');

const router = express.Router();
const Restaurant = require('../models/RestaurantModel');

// @route  GET yelp/restaurants/search
// @desc   Get restaurants using item name,cuisine,location,mode of delivery
// @access Public
router.get('/:data', async (req, res) => {
  const searchData = req.params.data;
  try {
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: `.*${searchData}.*` } },
        { location: { $regex: `.*${searchData}.*` } },
        { 'menu.name': { $regex: `.*${searchData}.*` } },
        { cuisine: { $regex: `.*${searchData}.*` } },
        { deliveryMethod: { $regex: `.*${searchData}.*` } },
      ],
    });
    if (!restaurants) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No restaurants found.' }] });
    }
    res.status(200).json(restaurants);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
