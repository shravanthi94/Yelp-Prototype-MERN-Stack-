import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../layout/Spinner';
import styles from './Dashboard-forms/form.module.css';
import { getRestaurantReviews } from '../../actions/dashboard';
import Rating from 'react-rating';

const Reviews = ({
  restaurantId,
  dashboard: { reviews, loading },
  getRestaurantReviews,
}) => {
  useEffect(() => {
    getRestaurantReviews(restaurantId);
  }, []);

  const displayReviews = () => {
    return reviews.map((review) => {
      return (
        <Fragment>
          <div className='box review'>
            <div className='rating'>
              <Rating
                emptySymbol='far fa-star'
                fullSymbol='fas fa-star'
                fractions={2}
                readonly
                initialRating={review.rating}
              />
              {'  '}
              <small>Review on {review.date.substring(0, 10)}</small>
            </div>
            <p className={styles.headers}>
              <strong>{review.comment}</strong>
            </p>
          </div>
        </Fragment>
      );
    });
  };
  return loading && reviews === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='container profile-title'>{displayReviews()}</div>
    </Fragment>
  );
};

Reviews.propTypes = {
  getRestaurantReviews: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getRestaurantReviews })(Reviews);
