import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Lista extends Component {
  state = {
    searchValue: '',
    redirect: false,
    categories: [],
    products: [],
    checked: false,
  };

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
    await getProductsFromCategoryAndQuery();
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
    const getProductByName = await getProductsFromCategoryAndQuery('', searchValue);
    this.setState({
      products: getProductByName.results,
    });
  };

  // handleRadioButtons = async () => {
  //   const getProducts = await getProductsFromCategoryAndQuery(value, checked.value);
  // };

  handleChangeBtn = () => {
    this.setState({
      redirect: true,
    });
  };

  // buttonClick = () => Redirect('/Carrinho');

  render() {
    const { searchValue, redirect, categories, products } = this.state;
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
            <input type="radio" value={ category.name } />
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

      </div>
    );
  }
}

export default Lista;
