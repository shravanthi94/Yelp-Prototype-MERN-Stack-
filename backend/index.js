/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const db = require('./config/db');

const registerCustomer = require('./routers/customer/register');
const loginCustomer = require('./routers/customer/login');
const profileCustomer = require('./routers/customer/profile');
const registerRestaurant = require('./routers/restaurant/register');
const loginRestaurant = require('./routers/restaurant/login');

db();

/*  Routes for Customers */
//  Customer - SIGNUP
app.use('/customer/register', registerCustomer);
//  Customer - LOGIN
app.use('/customer/login', loginCustomer);
//  Customer - PROFILE
app.use('/customer/profile', profileCustomer);

/* Routes for Restaurant */
//  Restaurant SIGNUP
app.use('/restaurant/register', registerRestaurant);
//  Restaurant - LOGIN
app.use('/restaurant/login', loginRestaurant);

//  Connection to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
