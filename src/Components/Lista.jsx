import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../services/api';

class Lista extends Component {
  state = {
    searchValue: '',
    redirect: false,
    categories: [],
    products: [],
    message: '',
  };

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
    await getProductsFromCategory();
    await getProductsFromQuery();
    await getProductsFromCategoryAndQuery();
    console.log(result);
  }

  handleChange = async ({ target }) => {
    const { value } = target;
    this.setState({
      searchValue: value,
    });
  };

  handleClickSearch = async () => {
    const { searchValue } = this.state;
    // const { value } = target;
    const getProductByName = await getProductsFromQuery(searchValue);
    if (getProductByName.results.length === 0) {
      this.setState({
        message: 'Nenhum produto foi encontrado',
      });
    }
    this.setState({
      products: getProductByName.results,
    });
  };

  handleRadioButtons = async ({ target }) => {
    const { value } = target;
    const getProducts = await getProductsFromCategory(value);
  };

  handleChangeBtn = () => {
    this.setState({
      redirect: true,
    });
  };

  // buttonClick = () => Redirect('/Carrinho');

  render() {
    const { searchValue, redirect, categories, products, message } = this.state;
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
          onClick={ this.handleClickSearch }
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
            <input
              type="radio"
              value={ category.id }
              onClick={ this.handleRadioButtons }
            />
            {category.name}
          </label>))}

        {products.map((product) => (
          <li key={ product.id } data-testid="product">
            <h2>
              {product.title}
            </h2>
            <p>
              {product.price}
            </p>
            <img src={ product.thumbnail } alt={ product.title } />
          </li>
          // thumbnail, title e price
        ))}
        <p>{ message }</p>
      </div>
    );
  }
}

export default Lista;
