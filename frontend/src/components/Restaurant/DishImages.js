import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Dashboard-forms/form.module.css';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { BACKEND_URL } from '../../utils/constants';

const Images = ({ location, setAlert }) => {
  const images = location.state.images;

  let files = images.split(',');
  console.log(files);

  const displayImages = () => {
    return files.map((file) => {
      if (file !== '') {
        return (
          <img
            className='dish-img'
            src={`${BACKEND_URL}/restaurant/images/dish/${file}`}
            alt='Dish_Image'
          />
        );
      }
    });
  };

  return (
    <Fragment>
      <div>
        <h1 className={styles.heading}>Dish Images</h1>
        <hr />
        <p>{displayImages()}</p>
      </div>
    </Fragment>
  );
};

Images.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Images);
