/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const db = require('./config/db');

const registerCustomer = require('./routers/customer/register');
const loginCustomer = require('./routers/customer/login');
const profileCustomer = require('./routers/customer/profile');
const registerRestaurant = require('./routers/restaurant/register');
const loginRestaurant = require('./routers/restaurant/login');
const profileRestaurant = require('./routers/restaurant/profile');
const resEvent = require('./routers/restaurant/event');
const cusEvent = require('./routers/customer/event');
const resOrders = require('./routers/restaurant/order');
const cusOrders = require('./routers/customer/order');

db();

/*  Routes for Customers */
//  Customer - SIGNUP
app.use('/customer/register', registerCustomer);
//  Customer - LOGIN
app.use('/customer/login', loginCustomer);
//  Customer - PROFILE
app.use('/customer/profile', profileCustomer);
//  Restaurant - Event
app.use('/customer/event', cusEvent);
//  Customer - ORDERS
app.use('/customer/order', cusOrders);

/* Routes for Restaurant */
//  Restaurant SIGNUP
app.use('/restaurant/register', registerRestaurant);
//  Restaurant - LOGIN
app.use('/restaurant/login', loginRestaurant);
//  Restaurant - PROFILE
app.use('/restaurant/profile', profileRestaurant);
//  Restaurant - Event
app.use('/restaurant/event', resEvent);
//  Restaurant - ORDERS
app.use('/restaurant/order', resOrders);

app.get('/', (req, res) => {
  res.send('hello');
});

//  Connection to a port
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
