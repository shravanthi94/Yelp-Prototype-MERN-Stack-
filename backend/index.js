/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const db = require('./config/db');

db();

//  Connection to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
