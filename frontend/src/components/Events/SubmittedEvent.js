import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './event.module.css';
import { getSubmittedEvents } from '../../actions/event';

const SubmittedEvent = ({
  getSubmittedEvents,
  event: { submitted, loading },
}) => {
  useEffect(() => {
    getSubmittedEvents();
  }, []);

  const listSubmittedEvents = () => {
    return submitted.map((event) => {
      return (
        <div className={styles.event_card}>
          <Link to={`/event/details/${event.name}`} className={styles.title}>
            {event.name}
          </Link>
          <br /> <br />
          <p>
            <i class='fas fa-calendar-day'></i> {event.date.substring(0, 10)},{' '}
            {event.time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.location}
          </p>
          <p className={styles.event_description}>{event.description}</p>
          <p className={styles.event_hashtags}>{event.hashtags}</p>
          <Link
            className={styles.color_white}
            to={{
              pathname: '/event/attendeelist',
              state: { customers: event.customer },
            }}
          >
            View Attendees
          </Link>
        </div>
      );
    });
  };
  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Submitted Events</h1>
        <div>{listSubmittedEvents()}</div>
      </div>
      <Link to='/event' className={styles.btn}>
        Back
      </Link>
    </Fragment>
  );
};

SubmittedEvent.propTypes = {
  getSubmittedEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { getSubmittedEvents })(SubmittedEvent);
