import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../profile-forms/form.module.css';
import spinner from '../../layout/Spinner';
import { getAllOrders } from '../../../actions/cusOrder';

const Orders = ({ getAllOrders, orders: { allorders, loading } }) => {
  useEffect(() => {
    getAllOrders();
  }, []);

  const displayOrders = (orders) => {
    return orders.map((order) => {
      return (
        <tr>
          <td>{order.restaurant.name}</td>
          <td>{order.item}</td>
          <td>{order.date.substring(0, 10)}</td>
          <td>{order.deliveryOption}</td>
          <td>{order.status}</td>
        </tr>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Orders Placed By You</h1>
        <Link
          to={`/customer/orders/filter/Received`}
          className={styles.top_btn}
        >
          Received
        </Link>
        <Link to='/customer/orders/filter/Preparing' className={styles.top_btn}>
          Preparing
        </Link>
        <Link to='/customer/orders/filter/Delivery' className={styles.top_btn}>
          Delivery
        </Link>
        <Link to='/customer/orders/filter/Pickup' className={styles.top_btn}>
          Pickup
        </Link>
        <br />
        <hr />
        <h1 className={styles.title}>All Orders</h1>
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Item Name</th>
            <th>Order Date</th>
            <th>Delivery Option</th>
            <th>Order Status</th>
          </tr>
          {displayOrders(allorders)}
        </table>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cusOrder,
});

export default connect(mapStateToProps, { getAllOrders })(Orders);
