import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Lista extends Component {
  state = {
    searchValue: '',
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      searchValue: value,
    });
  };

  handleChangeBtn = () => {
    this.setState({
      redirect: true,
    });
  };

  // buttonClick = () => Redirect('/Carrinho');

  render() {
    const { searchValue, redirect } = this.state;

    if (redirect) return <Redirect to="/Carrinho" />;

    return (
      <div>
        <label>
          <input type="search" value={ searchValue } onChange={ this.handleChange } />
        </label>

        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleChangeBtn }
        >
          carrinho

        </button>

        <p data-testid="home-initial-message">
          {!searchValue
            ? 'Digite algum termo de pesquisa ou escolha uma categoria.' : ''}
        </p>

      </div>
    );
  }
}

export default Lista;
