const User = require('../../models/UserModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'searchUser':
      return searchUser(payload, callback);
    case 'followUser':
      return followUser(payload, callback);
    case 'followingList':
      return followingList(payload, callback);
  }
};

async function searchUser(payload, callback) {
  const { data } = payload.params;
  const customerId = payload.user.id;
  try {
    const users = await User.find({
      $or: [{ name: data }, { 'about.nickname': data }, { 'about.city': data }],
      _id: { $ne: customerId },
    }).select('-password');

    if (!users) {
      response.status = 400;
      response.message = 'No users found with that search data';
      return callback(null, response);
    }

    response.status = 200;
    response.message = users;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function followUser(payload, callback) {
  const { id } = payload.params;
  const customerId = payload.user.id;
  try {
    const customer = await User.findById(customerId);

    if (customer.following.includes(id)) {
      response.status = 400;
      response.message = 'You are already following the user.';
      return callback(null, response);
    }

    customer.following.push(id);

    await customer.save();
    response.status = 200;
    response.message = 'You are following the user now.';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function followingList(payload, callback) {
  const customerId = payload.user.id;
  try {
    const data = await User.findById(customerId).select('following');
    console.log(data);
    const users = await User.find({ _id: { $in: data.following } });
    if (!users) {
      response.status = 400;
      response.message = 'You are not following anyone.';
      return callback(null, response);
    }

    response.status = 200;
    response.message = users;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
