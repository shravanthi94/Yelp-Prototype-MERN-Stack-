const connectDB = require('./config/db');
const connection = new require('./kafka/Connection');

// connect databse
connectDB();

const auth = require('./services/authorization.services/auth');
const restaurantProfile = require('./services/restaurant.services/profile');
const customerProfile = require('./services/customer.services/profile');

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + ' ', fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log('after handle' + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest('authorization', auth);
handleTopicRequest('restaurantProfile', restaurantProfile);
handleTopicRequest('customerProfile', customerProfile);
