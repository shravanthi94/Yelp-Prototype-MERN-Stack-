import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/LandingPage/Landing';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      {/* <Navbar /> */}
      <Route exact path='/' component={Landing} />
    </Fragment>
  </Router>
);

export default App;
