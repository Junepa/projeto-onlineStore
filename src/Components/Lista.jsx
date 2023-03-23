import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../services/api';
import Product from './Product';

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
      products: getProductsByCat.results,
    });
  };

  handleChangeBtn = () => {
    this.setState({
      redirect: true,
    });
  };

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

  // this.setState({
  //   array: ['rafael'],
  // });

  // const juju = 'Juliana';

  // this.setState({
  //   array: [...array, juju],
  // });
  // addCartByCategory = ({ target }) => {
  //   const { value } = target;
  //   const { productsByCategory } = this.state;

  //   const array = [];

  //   const result = productsByCategory.find((product) => product.id === value);

  //   array.push(result);

  //   localStorage.setItem('cart-products', JSON.stringify([...array]));
  // };

  render() {
    const {
      searchValue,
      redirect,
      categories,
      products,
      message,
    } = this.state;

    if (redirect) {
      return (<Redirect
        to={ {
          pathname: '/Carrinho',
          state: { id: products },
        } }
      />);
    }

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
          <div key={ product.id }>
            <Link
              to={ `/descricao/${product.id}` }
              data-testid="product-detail-link"
            >
              <Product
                title={ product.title }
                price={ product.price }
                thumbnail={ product.thumbnail }

              />
            </Link>
            <button
              data-testid="product-add-to-cart"
              type="button"
              value={ product.id }
              onClick={ () => this.addCart(product) }
            >
              Adicionar ao carrinho

            </button>
          </div>
          // thumbnail, title e price
        ))}

        <p>{ message }</p>
      </div>
    );
  }
}

export default Lista;
