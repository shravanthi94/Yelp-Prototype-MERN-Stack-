const Restaurant = require('../../models/RestaurantModel');
const Order = require('../../models/OrdersModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'allOrders':
      return allOrders(payload, callback);
    case 'placeorder':
      return placeorder(payload, callback);
  }
};

async function allOrders(payload, callback) {
  const userId = payload.user.id;
  try {
    const orders = await Order.find({ customer: userId })
      .sort({ date: -1 })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!orders) {
      response.status = 400;
      response.message = 'No orders placed';
      return callback(null, response);
    }
    response.status = 200;
    response.message = orders;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function placeorder(payload, callback) {
  const customerId = payload.user.id;
  const { item, deliveryOption, restaurantId } = payload.body;

  try {
    const order = new Order({
      restaurant: restaurantId,
      customer: customerId,
      item,
      deliveryOption,
      status: 'New',
    });

    await order.save();

    response.status = 200;
    response.message = 'Order has been placed.';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
