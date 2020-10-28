import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './event.module.css';
import { setAlert } from '../../actions/alert';

const AttendeeList = ({ location, setAlert }) => {
  const customers = location.state.customers;

  const listCustomers = () => {
    if (customers.length === 0) {
      setAlert('No registered customers', 'danger');
    }
    return customers.map((customer) => {
      return (
        <div className={styles.event_card}>
          <h1 className={styles.title}>
            <Link
              className={styles.cust_name}
              to={`/customer/details/${customer._id}`}
            >
              {customer.name}
            </Link>
          </h1>
        </div>
      );
    });
  };
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Attendee List</h1>
        <div className={styles.left}>{listCustomers()}</div>
      </div>
      <Link to='/event/submitted' className={styles.btn}>
        Go Back
      </Link>
    </Fragment>
  );
};

AttendeeList.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(AttendeeList);
