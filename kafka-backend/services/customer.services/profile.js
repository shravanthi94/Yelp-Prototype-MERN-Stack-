const User = require('../../models/UserModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'allUsers':
      return allUsers(payload, callback);
    case 'currentUserProfile':
      return currentUserProfile(payload, callback);
    case 'userProfileById':
      return userProfileById(payload, callback);
    case 'updateCustomerBasics':
      return updateCustomerBasics(payload, callback);
    case 'updateAbout':
      return updateAbout(payload, callback);
    case 'updateContact':
      return updateContact(payload, callback);
    case 'addReview':
      return addReview(payload, callback);
    case 'registerEvent':
      return registerEvent(payload, callback);
  }
};

async function allUsers(payload, callback) {
  const customerId = payload.user.id;
  try {
    const customers = await User.find({ _id: { $ne: customerId } }).select(
      '-password',
    );
    if (!customers) {
      response.status = 400;
      response.message = 'No customers found';
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

async function currentUserProfile(payload, callback) {
  try {
    const customer = await User.findById(payload.user.id).select('-password');

    if (!customer) {
      response.status = 400;
      response.message = 'User not found';
      return callback(null, response);
    }

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

async function userProfileById(payload, callback) {
  try {
    const customer = await User.findById(payload.customerId).select(
      '-password',
    );

    if (!customer) {
      response.status = 400;
      response.message = 'User not found';
      return callback(null, response);
    }

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

async function updateCustomerBasics(payload, callback) {
  const customerId = payload.user.id;
  const {
    name,
    dateOfBirth,
    city,
    state,
    country,
    nickName,
    headline,
  } = payload.body;

  try {
    const customer = await User.findById(customerId).select('-password');
    customer.name = name;
    customer.about.dob = dateOfBirth;
    customer.about.city = city;
    customer.about.state = state;
    customer.about.country = country;
    customer.about.nickname = nickName;
    customer.about.headline = headline;

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

async function updateAbout(payload, callback) {
  const customerId = payload.user.id;
  const {
    thingsILove,
    findMeIn,
    myBlog,
    whenNotYelping,
    whyReadMyReviews,
    recentDiscovery,
  } = payload.body;

  try {
    const customer = await User.findById(customerId).select('-password');
    customer.about.thingsILove = thingsILove;
    customer.about.findMeIn = findMeIn;
    customer.about.myBlog = myBlog;
    customer.about.notYelping = whenNotYelping;
    customer.about.whyMyReviews = whyReadMyReviews;
    customer.about.discovery = recentDiscovery;

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

async function updateContact(payload, callback) {
  const customerId = payload.user.id;
  const { email, phone } = payload.body;

  try {
    const customer = await User.findById(customerId).select('-password');
    customer.email = email;
    customer.phone = phone;

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

async function addReview(payload, callback) {
  const { restaurant, customerId } = payload;
  const { rating, text } = payload.body;

  try {
    const customer = await User.findById(customerId).select('-password');
    const newReview = {
      restaurant,
      rating,
      text,
    };

    customer.reviews.unshift(newReview);

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

async function registerEvent(payload, callback) {
  const customerId = payload.user.id;
  const eventId = payload.params.event_id;

  try {
    const customer = await User.findById(customerId).select('-password');
    if (
      customer.events.filter((event) => event.toString() === eventId).length > 0
    ) {
      response.status = 400;
      response.message = 'Event already registered';
      return callback(null, response);
    }

    const newEvent = { eventId };

    customer.events.unshift(newEvent);

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

exports.handle_request = handle_request;
