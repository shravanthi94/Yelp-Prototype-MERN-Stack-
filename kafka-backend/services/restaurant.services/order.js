const User = require('../../models/UserModel');
const Order = require('../../models/OrdersModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'getAllOrders':
      return getAllOrders(payload, callback);
    case 'updateOrderStatus':
      return updateOrderStatus(payload, callback);
    case 'cancelOrder':
      return cancelOrder(payload, callback);
  }
};

async function getAllOrders(payload, callback) {
  const resId = payload.user.id;
  try {
    const orders = await Order.find({ restaurant: resId })
      .sort({ date: -1 })
      .populate({
        path: 'customer',
        select: 'name',
        model: User,
      });
    if (!orders) {
      response.status = 400;
      response.message = 'No orders to display';
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

async function updateOrderStatus(payload, callback) {
  const { orderId } = payload;
  const { status } = payload.body;
  try {
    let orderType = '';
    if (status === 'Pickedup' || status === 'Delivered') {
      orderType = 'Completed';
    }
    const order = await Order.findById(orderId);
    order.status = status;
    order.type = orderType;
    await order.save();

    response.status = 200;
    response.message = 'Order status updated';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function cancelOrder(payload, callback) {
  const { orderId } = payload;
  try {
    const order = await Order.findById(orderId);
    order.status = 'Cancelled';
    order.type = 'Cancelled';
    await order.save();

    response.status = 200;
    response.message = 'Order has been cancelled';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
