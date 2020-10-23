import React, { Fragment } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const authLinks = (
    <div className='right'>
      {localStorage.restaurant ? (
        <Link to='/restaurant/profile' className='header_nav_link'>
          <i className='fas fa-user'></i> Dashboard
        </Link>
      ) : (
        <Link to='/profile' className='header_nav_link'>
          <i className='fas fa-user'></i> Profile
        </Link>
      )}
      {/* <a href='/' onClick={logout} className='header_nav_link'>
        Logout
      </a> */}
    </div>
  );

  const guestLinks = (
    <div className='right'>
      <Link to='/login' className='header_nav_link'>
        Log In
      </Link>
      <Link to='/signup' className='header_nav_button'>
        Sign Up
      </Link>
    </div>
  );

  const restLinks = (
    <Link to='/restaurant/orders' className='header_nav_link'>
      Orders
    </Link>
  );

  const custLinks = (
    <Fragment>
      <Link to='/customer/orders' className='header_nav_link'>
        Orders
      </Link>
      <Link to='/customer/restaurants' className='header_nav_link'>
        Restaurants
      </Link>
    </Fragment>
  );

  return (
    <div className='top-nav'>
      <div className='left'>
        <Link to='/' className='header_nav_link'>
          <img src={logo} className='logo' alt='logo-img' />
        </Link>
        <Link to='/event' className='header_nav_link'>
          Events
        </Link>
        {/* {!loading && ( */}
        {/* <Fragment>
            {isAuthenticated && restaurant ? restLinks : custLinks}
          </Fragment> */}
        {/* )} */}
      </div>
      {/* {!loading && ( */}
      {/* <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment> */}
      {/* )} */}
    </div>
  );
};

export default Navbar;
