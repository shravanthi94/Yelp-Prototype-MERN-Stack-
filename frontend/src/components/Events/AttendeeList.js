import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './event.module.css';
import { setAlert } from '../../actions/alert';

const AttendeeList = ({ location, setAlert }) => {
  const customers = location.state.customers;
  const name = location.state.name;

  const listCustomers = () => {
    if (customers.length === 0) {
      setAlert('No registered customers', 'danger');
    }
    return customers.map((customer) => {
      return (
        <td>
          <div>
            <h1>
              <Link
                className={styles.cust_name}
                to={`/customer/details/${customer._id}`}
              >
                {customer.name}
              </Link>
            </h1>
          </div>
        </td>
      );
    });
  };
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Attendee List</h1>
        <h2 className='subtitle is-4'>Customers attending {name}:</h2>
        <br />
        <table id='attendee'>
          <tr>
            <th>Customer Names</th>
          </tr>
          <tr>{listCustomers()}</tr>
        </table>
        {/* <div className={styles.left}>{listCustomers()}</div> */}
      </div>
      <Link to='/event/submitted' className='btn'>
        Go Back
      </Link>
    </Fragment>
  );
};

AttendeeList.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(AttendeeList);
