import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategory } from '../services/api';

class Descricao extends Component {
  state = {
    product: [],

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(this.props);
    const product = await getProductsFromCategory(id);
    console.log(product);
    this.setState({
      product,
    });
  }

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <div>
        <li data-testid="product">
          <h2>{ product.title}</h2>
          <img src={ product.thumbnail } alt={ product.title } />
          <h3>{ product.price }</h3>
        </li>
      </div>
    );
  }
}

Descricao.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
      .isRequired,
  }).isRequired,
};

export default Descricao;
