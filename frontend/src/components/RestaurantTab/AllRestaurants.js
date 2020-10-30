import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './restaurant.module.css';
import { getAllRestaurants } from '../../actions/restaurants';
import DisplayAll from './DisplayRestaurants';

const AllRestaurants = ({
  getAllRestaurants,
  restaurant: { restaurants, loading },
}) => {
  useEffect(() => {
    getAllRestaurants();
  }, []);

  let mapsInput = '';
  console.log(mapsInput);
  const displayMaps = () => {
    restaurants.forEach((res) => {
      mapsInput = mapsInput + '|' + res.location;
    });
    return (
      <img
        className='main-map'
        src={`https://maps.googleapis.com/maps/api/staticmap?&size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%20${mapsInput}&key=AIzaSyCKDg7Z_A4RDYYz0Sv1qCWnXX28XyDONCk`}
        alt='maps-locations'
      ></img>
    );
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='columns'>
        <div className='column is-7' style={{ padding: '2%' }}>
          {' '}
          <h1 className={styles.form_title}>All Restaurants</h1>
          <DisplayAll restaurants={restaurants} filters='' />
        </div>
        <div className='column is-5'>{displayMaps()}</div>
      </div>
    </Fragment>
  );
};

AllRestaurants.propTypes = {
  getAllRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getAllRestaurants })(AllRestaurants);
