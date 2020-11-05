const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//  Get the User mongoose model
const User = require('../../models/UserModel');
const Restaurant = require('../../models/RestaurantModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'customerSignup':
      return customerSignup(payload, callback);
    case 'customerSignin':
      return customerSignin(payload, callback);
    case 'restaurantSignup':
      return restaurantSignup(payload, callback);
    case 'restaurantSignin':
      return restaurantSignin(payload, callback);
  }
};

async function customerSignup(msg, callback) {
  const { name, email, password } = msg.body;

  try {
    //  1. Query to check if customer exists
    let user = await User.findOne({ email });

    if (user) {
      response.status = 400;
      response.message = 'User already exists';
      return callback(null, response);
    }

    //  3. Create user
    user = new User({
      name,
      email,
      password,
    });

    //  2. If customer does not exist, hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //  4. save to database
    await user.save();

    //  5. Pass the jsonwebtoken for that customer
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        usertype: 'customer',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 6000000 },
      (err, token) => {
        if (err) throw err;
        const result = {
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
        response.status = 200;
        response.message = result;
        return callback(null, response);
      },
    );
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function customerSignin(msg, callback) {
  const { email, password } = msg.body;

  try {
    // 1. See if user exists
    const user = await User.findOne({ email });

    if (!user) {
      response.status = 400;
      response.message = 'Invalid Credentials';
      return callback(null, response);
    }

    // 2. Match user's password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      response.status = 400;
      response.message = 'Invalid Credentials';
      return callback(null, response);
    }

    // 3. return jsonWebToken
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        usertype: 'customer',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '10 hours' },
      (err, token) => {
        if (err) throw err;
        const result = {
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
        response.status = 200;
        response.message = result;
        return callback(null, response);
      },
    );
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function restaurantSignup(msg, callback) {
  const { name, email, password, location } = msg.body;

  try {
    //  1. Query to check if customer exists
    let restaurant = await Restaurant.findOne({ email });

    if (restaurant) {
      response.status = 400;
      response.message = 'Restaurant already exists';
      return callback(null, response);
    }

    //  3. Create restaurant
    restaurant = new Restaurant({
      name,
      email,
      password,
      location,
    });

    //  2. If restaurant does not exist, hash the password
    const salt = await bcrypt.genSalt(10);
    restaurant.password = await bcrypt.hash(password, salt);

    //  4. save to database
    await restaurant.save();

    //  5. Pass the jsonwebtoken for that restaurant
    const payload = {
      user: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        usertype: 'restaurant',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 6000000 },
      (err, token) => {
        if (err) throw err;
        const result = {
          token,
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email,
        };
        response.status = 200;
        response.message = result;
        return callback(null, response);
      },
    );
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function restaurantSignin(msg, callback) {
  const { email, password } = msg.body;

  try {
    // 1. See if Restaurant exists
    const restaurant = await Restaurant.findOne({ email });

    if (!restaurant) {
      response.status = 400;
      response.message = 'Invalid Credentials';
      return callback(null, response);
    }

    // 2. Match restaurant's password matches
    const isMatch = await bcrypt.compare(password, restaurant.password);

    if (!isMatch) {
      response.status = 400;
      response.message = 'Invalid Credentials';
      return callback(null, response);
    }

    // 3. return jsonWebToken
    const payload = {
      user: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        usertype: 'restaurant',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '10 hours' },
      (err, token) => {
        if (err) throw err;
        const result = {
          token,
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email,
        };
        response.status = 200;
        response.message = result;
        return callback(null, response);
      },
    );
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
