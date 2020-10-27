import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDashboard } from '../../actions/dashboard';
import Reviews from './Reviews';
import spinner from '../layout/Spinner';
import '../css/dashboard.css';

const Dashboard = ({
  getCurrentDashboard,
  //   getImages,
  dashboard: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentDashboard();
  }, []);

  //   useEffect(() => {
  //     if (profile) {
  //       getImages(profile.restaurant_id);
  //     }
  //   }, [profile]);

  //   console.log(images);
  //   let allImages = [],
  //     files,
  //     allFiles;
  //   const splitImages = () => {
  //     if (images) {
  //       allImages = images.map((img) => img.item_image);
  //     }
  //     files = allImages.join(',');
  //     allFiles = files.split(',');
  //   };
  //   splitImages();
  //   console.log(allFiles);

  //   const displayImages = () => {
  //     return allFiles.map((file) => {
  //       if (file !== '1') {
  //         return (
  //           <img
  //             className='dish_img2'
  //             src={`http://54.183.239.208:3001/images/dish/${file}`}
  //             alt='Dish_Image'
  //           />
  //         );
  //       }
  //     });
  //   };

  //   let imgSrc;
  //   if (profile) {
  //     imgSrc = `http://54.183.239.208:3001/images/restaurant/${profile.restaurant_image}`;
  //   }

  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      {/* <div className='top-images'>{displayImages()}</div> */}
      <div className='container-dash'>
        <div className='left-dash'>
          {/* <h3>{profile.restaurant_name}</h3> */}
          {/* <img src={imgSrc} alt='Profile_pic' /> */}
          <h3 className='title-dash'>{profile.name}</h3>
          <h3 className='sub-heading'>Contact information</h3>
          <h4 className='title-dash'>
            <i class='far fa-envelope-open'></i> Email
          </h4>
          <p>{profile.email}</p>
          <h4 className='title-dash'>
            <i class='fas fa-phone'></i> Phone
          </h4>
          <p>{profile.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{profile.name}</h1>
            <h3>
              <i class='fas fa-map-marker-alt'></i> {profile.location}
            </h3>
            <h3>
              <i class='fas fa-clock'></i> {profile.timings}
            </h3>
          </div>
          <hr />
          <h2 className='activity'>Description</h2>
          {!profile.description ? (
            <p>Tell us about your restaurant...</p>
          ) : (
            <Fragment>
              <h3 className='description'>{profile.description}</h3>
            </Fragment>
          )}
          <hr />
          <h2 className='activity'>Popular Reviews</h2>
          {profile._id && <Reviews restaurantId={profile._id} />}
        </div>
        <div className='right-dash'>
          <h3 className='right-heading'>Updates</h3>
          <div className='update-links'>
            <Link to='/restaurant/update/basic' className='btn'>
              <i class='fas fa-address-card'></i> Update Profile
            </Link>
            <Link to='/restaurant/add/dish' className='btn'>
              <i class='fas fa-utensils'></i> Add Dishes
            </Link>
            <h3 className='right-heading'>Full Menu</h3>
            <Link to='/restaurant/view/menu' className='btn'>
              <i class='fas fa-user-friends'></i> View Menu
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  //   getImages: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getCurrentDashboard,
  //   getImages,
})(Dashboard);
