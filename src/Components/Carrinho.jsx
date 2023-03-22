import React, { Component } from 'react';

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
        <div data-testid="shopping-cart-empty-message">
          { !carrinho.length ? 'Seu carrinho está vazio' : carrinho.map((product) => (
            <div key={ product.id }>
              <h3 data-testid="shopping-cart-product-name">
                {product.title}
              </h3>
              <span>
                {product.price}
              </span>
              <p data-testid="shopping-cart-product-quantity">
                {product.quantity}
                <br />
                {new Date(product.date).toLocaleDateString()}
              </p>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Carrinho;
