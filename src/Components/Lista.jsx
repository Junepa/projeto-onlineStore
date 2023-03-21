import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getCategories,
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
    productsByCategory: [],
  };

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
  }

  handleChange = async ({ target }) => {
    const { value } = target;
    this.setState({
      searchValue: value,
    });
  };

  handleClickSearch = async () => {
    const { searchValue } = this.state;
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
    const getProductsByCat = await getProductsFromCategory(value);
    this.setState({
      productsByCategory: getProductsByCat.results,
    });
  };

  handleChangeBtn = () => {
    this.setState({
      redirect: true,
    });
  };

  //   addCart = () => {
  // // adicionar a lógica que adiciona o produto no carrinho!
  //   };

  render() {
    const {
      searchValue,
      redirect,
      categories,
      products,
      message,
      productsByCategory,
    } = this.state;

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
              name="obrigadoMoises"
              onClick={ this.handleRadioButtons }
            />
            {category.name}
          </label>))}

        {products.map((product) => (
          <Link
            to={ `/descricao/${product.id}` }
            key={ product.id }
            data-testid="product-detail-link"
          >
            <li data-testid="product">
              <h2>
                {product.title}
              </h2>
              <p>
                {product.price}
              </p>
              <img src={ product.thumbnail } alt={ product.title } />
            </li>
            <button
              data-testid="product-add-to-cart"
              type="button"
            >
              Adicionar ao carrinho

            </button>
          </Link>
          // thumbnail, title e price
        ))}
        {productsByCategory.map((product) => (
          <Link
            to={ `/descricao/${product.id}` }
            key={ product.id }
            data-testid="product-detail-link"
          >
            <li key={ product.id } data-testid="product">
              <h2>
                {product.title}
              </h2>
              <p>
                {product.price}
              </p>
              <img src={ product.thumbnail } alt={ product.title } />
            </li>
            <button
              data-testid="product-add-to-cart"
              type="button"
            >
              Adicionar ao carrinho

            </button>
          </Link>
        ))}
        <p>{ message }</p>
      </div>
    );
  }
}

export default Lista;
