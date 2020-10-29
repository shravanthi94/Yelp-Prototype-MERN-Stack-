import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';

//  Customer - Authorization
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';

//  Restaurant - Authorization
import ResLogin from './components/Restaurant/Login';
import ResSignup from './components/Restaurant/Signup';

//  Customer - Profile
import Profile from './components/Customer/Profile';
import UpdateProfile from './components/Customer/profile-forms/UpdateProfile';
import EditAbout from './components/Customer/profile-forms/EditAbout';
import EditContact from './components/Customer/profile-forms/EditContact';

//  Customer - Orders
import OrdersCus from './components/Customer/orders/Orders';
import FilterOrders from './components/Customer/orders/FilterOrders';

//  Restaurant - Profile
import Dashboard from './components/Restaurant/Dashboard';
import ResUpdateProfile from './components/Restaurant/Dashboard-forms/UpdateProfile';
import AddDish from './components/Restaurant/Dashboard-forms/AddDish';
import UpdateDish from './components/Restaurant/Dashboard-forms/UpdateItem';
import Menu from './components/Restaurant/Menu';

//  Customer - Restaurant Tab
import AllRest from './components/RestaurantTab/AllRestaurants';

//  Restaurant - Orders
import OrdersRes from './components/Restaurant/Orders/Order';
import ResFilterOrders from './components/Restaurant/Orders/FilterOrders';
// Events
import Event from './components/Events/Event';
import EventDetails from './components/Events/EventDetails';
import CreateEvent from './components/Events/CreateEvent';
import SubmittedEvent from './components/Events/SubmittedEvent';
import AttendeeList from './components/Events/AttendeeList';

//  Utils
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import { loadUser, loadRestaurant } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //  Component did mount
  useEffect(() => {
    if (localStorage.usertype === 'customer') {
      store.dispatch(loadUser());
    } else {
      store.dispatch(loadRestaurant());
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <PrivateRoute
            exact
            path='/restaurant/profile'
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path='/customer/restaurants'
            component={AllRest}
          />
          <section className='max-container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/restaurant/login' component={ResLogin} />
              <Route exact path='/restaurant/signup' component={ResSignup} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute
                exact
                path='/update/basic'
                component={UpdateProfile}
              />
              <PrivateRoute exact path='/update/about' component={EditAbout} />
              <PrivateRoute
                exact
                path='/update/contact'
                component={EditContact}
              />
              <PrivateRoute
                exact
                path='/restaurant/update/basic'
                component={ResUpdateProfile}
              />
              <PrivateRoute
                exact
                path='/restaurant/add/dish'
                component={AddDish}
              />
              <PrivateRoute
                exact
                path='/restaurant/item/update'
                component={UpdateDish}
              />
              <PrivateRoute
                exact
                path='/restaurant/view/menu'
                component={Menu}
              />
              <PrivateRoute exact path='/event' component={Event} />
              <Route
                exact
                path='/event/details/:event_name'
                component={EventDetails}
              />
              <PrivateRoute
                exact
                path='/event/create'
                component={CreateEvent}
              />
              <PrivateRoute
                exact
                path='/event/submitted'
                component={SubmittedEvent}
              />
              <PrivateRoute
                exact
                path='/event/attendeelist'
                component={AttendeeList}
              />
              <PrivateRoute
                exact
                path='/customer/orders'
                component={OrdersCus}
              />
              <PrivateRoute
                exact
                path='/customer/orders/filter/:data'
                component={FilterOrders}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders'
                component={OrdersRes}
              />
              <PrivateRoute
                exact
                path='/restaurant/orders/:data'
                component={ResFilterOrders}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
