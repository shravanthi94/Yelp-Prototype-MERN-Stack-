const Event = require('../../models/EventModel');
const User = require('../../models/UserModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'allEvents':
      return allEvents(payload, callback);
    case 'eventByName':
      return eventByName(payload, callback);
    case 'createEvent':
      return createEvent(payload, callback);
    case 'submittedEvents':
      return submittedEvents(payload, callback);


  }
};

async function allEvents(payload, callback) {
  try {
    // const events = await Event.find({}, null, { sort: { eventDate: -1 } });
    // const events = await Event.find({}, { $orderby: { eventDate: -1 }});
    const events = await Event.find({ $query: {}, $orderby: { eventDate : -1 } });
    console.log("events after sort: ", events);
    
    if (!events) {
      response.status = 400;
      response.message = 'No events found.';
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

async function eventByName(payload, callback) {
  const { eventName } = payload;
  try {
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      response.status = 400;
      response.message = 'No event found.';
      return callback(null, response);
    }

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

async function createEvent(payload, callback) {
  const restaurant = payload.user.id;

  const { name, description, time, date, location, hashtags } = payload.body;

  try {
    const event = new Event({
      restaurant,
      name,
      description,
      time,
      eventDate: date,
      location,
      hashtags,
    });

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

async function submittedEvents(payload, callback) {
  try {
    const events = await Event.find({ restaurant: req.user.id }).populate({
      path: 'customer',
      select: 'name',
      model: User,
    });

    if (!events) {
      response.status = 400;
      response.message = 'No events found.';
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
