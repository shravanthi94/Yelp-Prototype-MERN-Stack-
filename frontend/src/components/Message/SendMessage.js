import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import spinner from '../layout/Spinner';
import { RestaurantSendMessage, getConversation } from '../../actions/message';
import { getCurrentDashboard } from '../../actions/dashboard';
import Conversation from './Conversation';

const SendMessage = ({
  match,
  getCurrentDashboard,
  getConversation,
  RestaurantSendMessage,
  history,
  dashboard: { profile, loading },
  message: { conversation, mesloading },
}) => {
  const customerId = match.params.id;

  useEffect(() => {
    getCurrentDashboard();
    if (!loading) {
      getConversation(profile._id, customerId);
    }
  }, [loading]);

  const [text, settext] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    RestaurantSendMessage(text, customerId, history);
  };

  return !profile || loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Your Conversation</h1>
        <hr />
        {conversation && <Conversation data={conversation} />}
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Message text</label>
            <br />
            {/* <small className={styles.form_text}>
              Tell us what you feel about our restaurant...
            </small> */}
            <textarea
              className={styles.my_headline}
              maxlength='2000'
              size='30'
              rows='6'
              type='text'
              name='text'
              value={text}
              onChange={(e) => settext(e.target.value)}
            ></textarea>
          </div>
          <input type='submit' value='Send Message' className={styles.btn} />
          {/* <div className={styles.btn_grey}>
            <Link to={`/restaurant/details/${resId}`}>Cancel</Link>
          </div> */}
        </form>
      </div>
    </Fragment>
  );
};

SendMessage.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  RestaurantSendMessage: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  message: state.message,
});

export default connect(mapStateToProps, {
  getCurrentDashboard,
  RestaurantSendMessage,
  getConversation,
})(withRouter(SendMessage));
