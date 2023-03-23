import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const {
      title,
      price,
      thumbnail,
    } = this.props;
    return (
      <div>
        <li data-testid="product">
          <h2>
            {title}

          </h2>
          <p>
            {price}
          </p>
          <img src={ thumbnail } alt={ title } />
        </li>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Product;
