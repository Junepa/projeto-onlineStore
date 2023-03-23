import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsId } from '../services/api';

class Descricao extends Component {
  state = {
    product: null,

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductsId(id);
    this.setState({
      product,
    });
  }

  addCart = (product) => {
    const cartText = 'cart-products';

    const productsOnStorage = JSON.parse(localStorage.getItem(cartText)) || [];

    const isOnStorage = productsOnStorage.find((element) => element.id === product.id);

    if (isOnStorage) {
      const daniloMusk = productsOnStorage.map((element) => {
        if (element.id === product.id) {
          return {
            ...element,
            quantity: element.quantity + 1,
          };
        }

        return element;
      });
      localStorage.setItem(cartText, JSON.stringify(daniloMusk));
    } else {
      const updatedList = [
        ...productsOnStorage,
        {
          ...product,
          quantity: 1,
          date: new Date(),
        },
      ];

      localStorage.setItem(cartText, JSON.stringify(updatedList));
    }
  };

  render() {
    const { history } = this.props;
    const { product } = this.state;
    return (
      <div>

        {product === null ? (
          <p>Careegando...</p>
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
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              value={ product.id }
              onClick={ () => this.addCart(product) }
            >
              Adicionar ao carrinho

            </button>
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
