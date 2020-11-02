import React, { Fragment } from 'react';
import { BACKEND_URL } from '../../utils/constants';

const ImageCard = ({ images }) => {
  let imageFile = images.slice(0, images.indexOf(','));
  console.log(imageFile);

  return (
    <Fragment>
      <img
        className='dish_img'
        src={`${BACKEND_URL}/restaurant/images/dish/${imageFile}`}
        alt='Dish_Image'
      />
    </Fragment>
  );
};

export default ImageCard;
