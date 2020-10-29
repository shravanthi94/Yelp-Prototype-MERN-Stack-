import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './restaurant.module.css';
import { getAllRestaurants } from '../../actions/restaurants';

const AllRestaurants = ({
  getAllRestaurants,
  restaurant: { restaurants, loading },
}) => {
  useEffect(() => {
    getAllRestaurants();
  }, []);

  const displayRestaurants = () => {
    return restaurants.map((res) => {
      return (
        <Fragment>
          <div class='box border' style={{ color: 'black' }}>
            <article class='media'>
              <div class='media-content'>
                <div class='content'>
                  <div className='columns'>
                    <div className='column is-5'>
                      {/* <img
                        className={styles.img}
                        src={`http://54.183.239.208:3001/images/restaurant/${res.restaurant_image}`}
                        alt='Restaurant_image'
                      /> */}
                    </div>
                    <div className='column is-7'>
                      <p>
                        <strong>
                          <Link
                            className={styles.rest_name}
                            to={`/restaurant/details/${res._id}`}
                          >
                            {res.name}
                          </Link>
                        </strong>
                        <br />
                      </p>
                      <p>
                        <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
                        {res.deliveryMethod}
                      </p>
                      <p>
                        <i class='far fa-envelope-open'></i> {res.email}
                      </p>
                      <p>
                        <i class='fas fa-phone'></i> {res.phone}
                      </p>
                      <p>
                        <i class='fas fa-map-marker-alt'></i> {res.location}
                      </p>
                      <p>
                        <i class='fas fa-clock'></i> {res.timings}
                      </p>
                      <p>{res.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Fragment>
      );
    });
  };

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
        <div className='column is-7 pdx-5'>
          {' '}
          <h1 className={styles.form_title}>All Restaurants</h1>
          {displayRestaurants()}
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
