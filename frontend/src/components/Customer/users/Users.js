import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../layout/Spinner';
import {
  getAllCustomers,
  getSearchResutls,
  getFollowers,
} from '../../../actions/users';
import styles from '../../Events/event.module.css';

const Users = ({
  getAllCustomers,
  getSearchResutls,
  getFollowers,
  users: { customers, loading },
}) => {
  useEffect(() => {
    getAllCustomers();
  }, []);

  const [searchData, setsearchData] = useState('');

  const handleSearch = (e) => {
    getSearchResutls(searchData);
  };

  const handleFollowing = (e) => {
    getFollowers();
  };

  const handleAllUsers = (e) => {
    getAllCustomers();
  };

  const displayAllCustomers = () => {
    return customers.map((customer) => {
      return (
        <Fragment>
          <div className={styles.event_card}>
            <Link
              to={`/customer/details/${customer._id}`}
              className={styles.title}
            >
              {customer.name}
            </Link>
            <br /> <br />
            <p>
              <i class='fas fa-calendar-day'></i>{' '}
              {/* {customer.date && customer.date.substring(0, 10)}, {customer.time} */}
            </p>
            <p>
              <i class='fas fa-map-marker-alt'></i> {customer.location}
            </p>
            {/* <p className={styles.event_description}>{event.description}</p> */}
            {/* <p className={styles.event_hashtags}>{event.hashtags}</p> */}
          </div>
        </Fragment>
      );
    });
  };
  return loading && !customers ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-12'>
            <h1 className={styles.heading}>Official Yelp Users</h1>
            <div className={styles.display}>
              <input
                className='field request search_bar'
                type='text'
                placeholder='Search by User Name/Nickname'
                name='searchData'
                value={searchData}
                onChange={(e) => setsearchData(e.target.value)}
              />
              {/* <Link
                to={`/customer/search/${searchData}`}
                className={styles.btn_update}
              >
                Search
              </Link> */}
              <button
                className={styles.btn_update}
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <button
          className={styles.btn_update}
          onClick={(e) => handleAllUsers(e)}
        >
          All users
        </button>
        <button
          className={styles.btn_update}
          onClick={(e) => handleFollowing(e)}
        >
          Following
        </button>
      </div>

      {displayAllCustomers()}
    </Fragment>
  );
};

Users.propTypes = {
  getAllCustomers: PropTypes.func.isRequired,
  getSearchResutls: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  getAllCustomers,
  getSearchResutls,
  getFollowers,
})(Users);
