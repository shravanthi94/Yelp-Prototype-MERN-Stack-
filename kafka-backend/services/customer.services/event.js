const Event = require('../../models/EventModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'registerEvent':
      return registerEvent(payload, callback);
    case 'allRegisteredEvent':
      return allRegisteredEvent(payload, callback);
  }
};

async function registerEvent(payload, callback) {
  const { eventId, customerId } = payload;
  try {
    const event = await Event.findById(eventId);

    if (!event.customer.includes(customerId)) {
      event.customer.push(customerId);
    } else {
      response.status = 400;
      response.message = 'Already registered.';
      return callback(null, response);
    }

    await event.save();

    response.status = 200;
    response.message = event;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function allRegisteredEvent(payload, callback) {
  const { customerId } = payload;
  try {
    const events = await Event.find({ customer: { $all: [customerId] } });

    if (!events) {
      response.status = 400;
      response.message = 'Not registered for any events.';
      return callback(null, response);
    }

    response.status = 200;
    response.message = events;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
