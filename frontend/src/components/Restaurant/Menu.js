import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard-forms/form.module.css';
import ImageCard from './ImageCard';

const Menu = ({ location }) => {
  const menu = location.state.menu;

  const displayCategory = (type) => {
    const itemType = menu.filter((each) => each.category === type);
    if (itemType.length === 0) {
      return '';
    }
    return itemType.map((item) => {
      return (
        <Fragment>
          <div class='tile is-ancestor'>
            <div class='tile is-parent is-7'>
              <article class='tile is-child box'>
                <div className='columns'>
                  {item.image && (
                    <div className='column is-3'>
                      <ImageCard images={item.image} />
                    </div>
                  )}
                  <div className='column is-9'>
                    <p class={styles['item-title']}>{item.name}</p>
                    <p class={styles['item-ingredients']}>
                      {item.ingredients} <br /> $ {item.price}
                    </p>
                    <p class={styles['item-description']}>{item.description}</p>
                  </div>
                </div>
                {localStorage.usertype === 'restaurant' && (
                  <Link
                    className={styles['update-btn']}
                    to={{
                      pathname: '/restaurant/item/update',
                      state: { itemId: item._id },
                    }}
                  >
                    Update item
                  </Link>
                )}
                {item.image && (
                  <Link
                    className={styles['update-btn']}
                    style={{ marginLeft: '2%' }}
                    to={{
                      pathname: '/restaurant/item/images',
                      state: { images: item.image },
                    }}
                  >
                    View Images
                  </Link>
                )}
              </article>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  return (
    <div>
      <h1 className={styles.form_title}>Menu</h1>
      <h2 className={styles['menu-subheading']}>Appetizers</h2>
      <hr />
      {displayCategory('Appetizer')}
      <h2 className={styles['menu-subheading']}>Salads</h2>
      <hr />
      {displayCategory('Salads')}
      <h2 className={styles['menu-subheading']}>Main Course</h2>
      <hr />
      {displayCategory('Main Course')}
      <h2 className={styles['menu-subheading']}>Beverages</h2>
      <hr />
      {displayCategory('Beverages')}
      <h2 className={styles['menu-subheading']}>Desserts</h2>
      <hr />
      {displayCategory('Desserts')}
      <br />
    </div>
  );
};

export default Menu;
