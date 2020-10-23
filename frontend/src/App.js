import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/LandingPage/Landing';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch></Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
