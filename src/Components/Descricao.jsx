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
    this.setState({
      product,
    });
  }

  render() {
    const { history } = this.props;
    const { product: { title, thumbnail, price } } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{title}</p>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-price">{ price }</p>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/carrinho') }
        >
          Comprar
        </button>
      </div>
    );
  }
}

Descricao.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Descricao;
