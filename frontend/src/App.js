import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';

//  Customer - Authorization
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';

//  Customer - Profile
import Profile from './components/Customer/Profile';
import UpdateProfile from './components/Customer/profile-forms/UpdateProfile';
import EditAbout from './components/Customer/profile-forms/EditAbout';
import EditContact from './components/Customer/profile-forms/EditContact';

//  Utils
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
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
    // if (localStorage.usertype === 'customer') {
    store.dispatch(loadUser());
    // }
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
