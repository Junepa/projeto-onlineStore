import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Lista extends Component {
  state = {
    searchValue: '',
    redirect: false,
    categories: [],
  };

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
    await getProductsFromCategoryAndQuery();
  }

  handleChange = async ({ target }) => {
    const { value, checked } = target;
    const getProducts = await getProductsFromCategoryAndQuery(value, checked.value);
    console.log(getProducts);
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
    const { searchValue, redirect, categories } = this.state;

    if (redirect) return <Redirect to="/Carrinho" />;

    return (
      <div>
        <label>
          <input
            type="search"
            value={ searchValue }
            onChange={ this.handleChange }
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleChange }
        >
          Search

        </button>

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
        {categories.map((category) => (
          <label data-testid="category" key={ category.id }>
            <input type="radio" />
            {category.name}
          </label>))}

      </div>
    );
  }
}

export default Lista;
