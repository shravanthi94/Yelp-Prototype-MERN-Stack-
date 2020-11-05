const Restaurant = require('../../models/RestaurantModel');
const User = require('../../models/UserModel');
const { checkAuth } = require('../../middleware/resAuth');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'allRestaurants':
      return allRestaurants(payload, callback);
    case 'getCurrentRestaurant':
      return getCurrentRestaurant(payload, callback);
    case 'getRestaurantById':
      return getRestaurantById(payload, callback);
    case 'updateBasics':
      return updateBasics(payload, callback);
    case 'updateContact':
      return updateContact(payload, callback);
    case 'addMenuItem':
      return addMenuItem(payload, callback);
    case 'updateMenuItem':
      return updateMenuItem(payload, callback);
    case 'getRestaurantReviews':
      return getRestaurantReviews(payload, callback);
  }
};

async function allRestaurants(payload, callback) {
  try {
    const restaurants = await Restaurant.find().select('-password');
    if (!restaurants) {
      response.status = 400;
      response.message = 'No restaurants found';
      return callback(null, response);
    }
    response.status = 200;
    response.message = restaurants;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function getCurrentRestaurant(payload, callback) {
  try {
    const restaurant = await Restaurant.findById(payload.user.id).select(
      '-password',
    );
    if (!restaurant) {
      response.status = 400;
      response.message = 'No restaurant found';
      return callback(null, response);
    }
    response.status = 200;
    response.message = restaurant;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function getRestaurantById(payload, callback) {
  const { resId } = payload;
  try {
    const restaurant = await Restaurant.findById(resId).select('-password');
    if (!restaurant) {
      response.status = 400;
      response.message = 'No restaurant found';
      return callback(null, response);
    }
    response.status = 200;
    response.message = restaurant;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function updateBasics(payload, callback) {
  const resId = payload.user.id;
  const {
    name,
    email,
    location,
    phone,
    description,
    timings,
    delivery,
    cuisine,
  } = payload.body;

  try {
    const restaurant = await Restaurant.findById(resId).select('-password');
    restaurant.name = name;
    restaurant.email = email;
    restaurant.location = location;
    restaurant.phone = phone;
    restaurant.description = description;
    restaurant.timings = timings;
    restaurant.deliveryMethod = delivery;
    restaurant.cuisine = cuisine;

    await restaurant.save();

    response.status = 200;
    response.message = 'Restaurant details updated';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function updateContact(payload, callback) {
  const resId = payload.user.id;
  const { email, phone } = payload.body;

  try {
    const restaurant = await Restaurant.findById(resId).select('-password');
    restaurant.email = email;
    restaurant.phone = phone;

    await restaurant.save();

    response.status = 200;
    response.message = 'Restaurant contact details updated';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function addMenuItem(payload, callback) {
  const resId = payload.user.id;
  const { name, ingredients, price, description, category } = payload.body;

  try {
    const restaurant = await Restaurant.findById(resId).select('-password');
    const newItem = { name, ingredients, price, description, category };
    restaurant.menu.push(newItem);
    await restaurant.save();

    response.status = 200;
    response.message = 'Menu item added.';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function updateMenuItem(payload, callback) {
  const { resId, itemId } = payload;

  const { name, ingredients, price, description, category } = payload.body;

  try {
    const restaurant = await Restaurant.findById(resId).select('-password');

    restaurant.menu.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.name = name;
        item.ingredients = ingredients;
        item.price = price;
        item.description = description;
        item.category = category;
      }
    });

    await restaurant.save();

    response.status = 200;
    response.message = 'Menu item updated.';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function getRestaurantReviews(payload, callback) {
  const { resId } = payload;
  try {
    const customers = await User.find({ 'reviews.restaurant': resId }).select(
      'name reviews',
    );
    if (customers.length === 0) {
      response.status = 400;
      response.message = 'No reviews added';
      return callback(null, response);
    }
    response.status = 200;
    response.message = customers;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
