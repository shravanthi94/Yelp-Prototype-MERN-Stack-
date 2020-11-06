const User = require('../../models/UserModel');
const Restaurant = require('../../models/RestaurantModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'uploadCustomerImage':
      return uploadCustomerImage(payload, callback);
    case 'uploadRestaurantImage':
      return uploadRestaurantImage(payload, callback);
    case 'uploadDishImage':
      return uploadDishImage(payload, callback);
    case 'getAllImages':
      return getAllImages(payload, callback);
  }
};

async function uploadCustomerImage(payload, callback) {
  try {
    const customer = await User.findById(payload.user.id);
    customer.image = payload.file.filename;

    await customer.save();

    response.status = 200;
    response.message = customer;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function uploadRestaurantImage(payload, callback) {
  try {
    const restaurant = await Restaurant.findById(payload.user.id);
    restaurant.image = payload.file.filename;

    await restaurant.save();

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

async function uploadDishImage(payload, callback) {
  try {
    const restaurant = await Restaurant.findById(payload.user.id);
    restaurant.menu.forEach((item) => {
      if (item._id.toString() === payload.params.dish_id) {
        item.images.push(payload.file.filename);
      }
    });
    await restaurant.save();

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

async function getAllImages(payload, callback) {
  const resId = payload.params.res_id;
  try {
    const results = await Restaurant.findById(resId).select('menu.images');
    if (!results) {
      response.status = 400;
      response.message = 'No images found.';
      return callback(null, response);
    }
    console.log(results.menu);
    let images = [];
    results.menu.forEach((item) => {
      images = [...images, ...item.images];
    });
    console.log(images);
    response.status = 200;
    response.message = images;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
