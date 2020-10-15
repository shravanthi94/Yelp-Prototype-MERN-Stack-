/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const db = require('./config/db');

const registerCustomer = require('./routers/customer/register');
const loginCustomer = require('./routers/customer/login');
const profileCustomer = require('./routers/customer/profile');

db();

/*  Routes for Customers */
//  Customer - SIGNUP
app.use('/customer/register', registerCustomer);
//  Customer - LOGIN
app.use('/customer/login', loginCustomer);
//  Customer - PROFILE
app.use('/customer/profile', profileCustomer);

//  Connection to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
