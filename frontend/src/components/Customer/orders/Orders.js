import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../profile-forms/form.module.css';
import spinner from '../../layout/Spinner';
import { getAllOrders } from '../../../actions/cusOrder';
import Date from '../../../utils/Date';

const Orders = ({ getAllOrders, orders: { allorders, loading } }) => {
  const [sortType, setsortType] = useState('Acsending');
  const [orders, setorders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (!loading) {
      setorders(allorders.reverse());
    }
    console.log(orders);
  }, [loading, sortType]);

  const displayOrders = (orders) => {
    return orders.map((order) => {
      return (
        <div className='tile is-ancestor'>
          <div class='tile is-parent is-4'>
            <article class='tile is-child box has-background-link-light'>
              <p class='title is-4 has-text-black'>{order.item}</p>
              <p class='title is-5 has-text-danger-dark'>
                {order.restaurant.name} [{order.deliveryOption}]
              </p>
              <p class='subtitle has-text-black'>
                Current order status: {order.status}
              </p>
              <p class='date-order'>
                Order placed on: <Date date={order.date.substring(0, 10)} />
              </p>
            </article>
          </div>
        </div>
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
        <select
          className='select-css'
          name='orders'
          onChange={(e) => setsortType(e.target.value)}
        >
          <option>Sort by...</option>
          <option>Acsending</option>
          <option>Descending</option>
        </select>
        <br />
        <h1 className={styles.title}>All Orders</h1>
        {displayOrders(orders)}
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
