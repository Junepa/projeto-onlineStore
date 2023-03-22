import React, { Component } from 'react';
import Lista from './Lista';

class Carrinho extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    this.setState({
      carrinho: JSON.parse(localStorage.getItem('cart-products')) || [],
    });
  }

  teste = () => {
    // const { location } = this.props;
    // const { state } = location;
    // const { id } = state;
    // this.setState({
    //   carrinho: localStorage.getItem(JSON.parse(id)),
    // });
  };

  render() {
    const { carrinho } = this.state;
    this.teste();
    console.log(carrinho);
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
