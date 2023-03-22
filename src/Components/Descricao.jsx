import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsId } from '../services/api';

class Descricao extends Component {
  state = {
    product: null,

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(this.props);
    const product = await getProductsId(id);
    this.setState({
      product,
    });
  }

  render() {
    const { history } = this.props;
    const { product } = this.state;
    return (
      <div>

        {product === null ? (
          <p>Carregando...</p>
        ) : (
          <>
            <p data-testid="product-detail-name">{product.title}</p>
            <img
              src={ product.thumbnail }
              alt={ product.title }
              data-testid="product-detail-image"
            />
            <p data-testid="product-detail-price">{ product.price }</p>
            <button
              data-testid="shopping-cart-button"
              onClick={ () => history.push('/carrinho') }
            >
              Comprar
            </button>
            <button></button>
          </>
        )}
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
