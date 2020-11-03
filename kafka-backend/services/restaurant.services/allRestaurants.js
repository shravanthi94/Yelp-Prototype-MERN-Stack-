const Restaurant = require('../../models/RestaurantModel');

const handle_request = async (body, callback) => {
  let restaurants = await Restaurant.find();
  if (!restaurants) {
    callback(
      {
        message: 'No restaurants in DB!',
      },
      null,
    );
  }
  if (!callback) return restaurants;

  callback(null, restaurants);
};

// export { handle_request };
// module.exports = handle_request;
exports.handle_request = handle_request;
