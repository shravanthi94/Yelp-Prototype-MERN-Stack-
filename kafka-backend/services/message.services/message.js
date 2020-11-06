const Message = require('../../models/MessageModel');
const User = require('../../models/UserModel');
const Restaurant = require('../../models/RestaurantModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'restaurantSendMessage':
      return restaurantSendMessage(payload, callback);
    case 'restaurantViewConvo':
      return restaurantViewConvo(payload, callback);
    case 'customerReplyMessage':
      return customerReplyMessage(payload, callback);
    case 'customerAllConvo':
      return customerAllConvo(payload, callback);
    case 'customerViewConvo':
      return customerViewConvo(payload, callback);
  }
};

async function restaurantSendMessage(payload, callback) {
  try {
    const { text } = payload.body;
    const { customerId } = payload.params;
    const { restaurantId } = payload;

    const conversation = await Message.find({
      restaurant: restaurantId,
      customer: customerId,
    });

    if (conversation.length === 0) {
      const message = {};
      message.usertype = 'restaurant';
      message.text = text;

      const newMessage = new Message({
        restaurant: restaurantId,
        customer: customerId,
      });

      newMessage.messages.push(message);

      await newMessage.save();

      response.status = 200;
      response.message = 'Successfully sent the message.';
      return callback(null, response);
    } else {
      conversation[0].messages.push({
        usertype: 'restaurant',
        text,
      });

      await conversation[0].save();

      response.status = 200;
      response.message = 'Successfully sent the message.';
      return callback(null, response);
    }
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function restaurantViewConvo(payload, callback) {
  const { customerId, restaurantId } = payload.params;
  try {
    const messages = await Message.find({
      restaurant: restaurantId,
      customer: customerId,
    })
      .populate({
        path: 'customer',
        select: 'name',
        model: User,
      })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!messages) {
      response.status = 400;
      response.message = 'No messages found.';
      return callback(null, response);
    }
    response.status = 200;
    response.message = messages[0];
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function customerReplyMessage(payload, callback) {
  try {
    const { text } = payload.body;
    const messageId = payload.params.id;

    const conversation = await Message.findById(messageId);
    conversation.messages.push({
      usertype: 'customer',
      text,
    });

    await conversation.save();

    response.status = 200;
    response.message = 'Successfully sent the message.';
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function customerAllConvo(payload, callback) {
  const customerId = payload.user.id;
  try {
    const conversations = await Message.find({ customer: customerId })
      .populate({
        path: 'customer',
        select: 'name',
        model: User,
      })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!conversations) {
      response.status = 400;
      response.message = 'Conversations not found.';
      return callback(null, response);
    }
    response.status = 200;
    response.message = conversations;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function customerViewConvo(payload, callback) {
  const messageId = payload.params.id;
  try {
    const conversation = await Message.findById(messageId)
      .populate({
        path: 'customer',
        select: 'name',
        model: User,
      })
      .populate({
        path: 'restaurant',
        select: 'name',
        model: Restaurant,
      });
    if (!conversation) {
      response.status = 400;
      response.message = 'Conversations not found.';
      return callback(null, response);
    }
    response.status = 200;
    response.message = conversation;
    return callback(null, response);
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}
exports.handle_request = handle_request;
