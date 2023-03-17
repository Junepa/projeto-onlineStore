import React, { Component } from 'react';

class Carrinho extends Component {
  state = {
    carrinho: [],
  };

  render() {
    const { carrinho } = this.state;

    return (
      <div>
        <p>Carrinho de Compras</p>
        <p data-testid="shopping-cart-empty-message">
          { !carrinho.length ? 'Seu carrinho está vazio' : carrinho}

        </p>
      </div>
    );
  }
}

export default Carrinho;
