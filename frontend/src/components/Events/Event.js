import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './event.module.css';
import { getAllEvents, getRegisteredEvents } from '../../actions/event';

const Event = ({
  getAllEvents,
  event: { events, registered, loading },
  getRegisteredEvents,
  history,
}) => {
  useEffect(() => {
    getAllEvents();
    if (localStorage.usertype == 'customer') {
      getRegisteredEvents();
    }
  }, []);

  const [eventSearch, seteventSearch] = useState('');

  const listAllEvents = (list, button) => {
    return list.map((event) => {
      return (
        <div className={styles.event_card}>
          <Link to={`/event/details/${event.name}`} className={styles.title}>
            {event.name}
          </Link>
          <br /> <br />
          <p>
            <i class='fas fa-calendar-day'></i>{' '}
            {event.date && event.date.substring(0, 10)}, {event.time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.location}
          </p>
          <p className={styles.event_description}>{event.description}</p>
          <p className={styles.event_hashtags}>{event.hashtags}</p>
        </div>
      );
    });
  };

  let miniList = [];

  if (registered.length > 3) {
    miniList = registered.splice(0, 3);
  }
  console.log(miniList);

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-12'>
            <h1 className={styles.heading}>Official Yelp Events</h1>
            <div className={styles.display}>
              <input
                className='field request search_bar'
                type='text'
                placeholder='Search by Event Name'
                name='eventSearch'
                value={eventSearch}
                onChange={(e) => seteventSearch(e.target.value)}
              />
              <Link
                to={`/event/details/${eventSearch}`}
                className={styles.btn_update}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.rest_links}>
            {localStorage.usertype == 'restaurant' && (
              <Fragment>
                <Link to='/event/create' className={styles.btn_update}>
                  Create Event
                </Link>{' '}
                <Link to='/event/submitted' className={styles.btn_update}>
                  Events Submitted
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <br /> <br />
        <div>
          {localStorage.usertype == 'restaurant' ? (
            ''
          ) : (
            <Fragment>
              {' '}
              <h1 className={styles.heading}>Your Registered Events</h1>
              {miniList.length > 0 ? (
                <Fragment>
                  {listAllEvents(miniList, false)}{' '}
                  <Link to='/event/registered' className={styles.view_all}>
                    View all
                  </Link>
                  <br />
                  <br />
                  <br /> <hr />
                </Fragment>
              ) : (
                listAllEvents(registered, false)
              )}
            </Fragment>
          )}
          <hr />
          <h1 className={styles.heading}>Popular Events</h1>
          {listAllEvents(events, true)}
        </div>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  getRegisteredEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, {
  getAllEvents,
  getRegisteredEvents,
})(withRouter(Event));
