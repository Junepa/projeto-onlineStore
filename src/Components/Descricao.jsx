import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategory } from '../services/api';

class Descricao extends Component {
  state = {
    product: [],

  };

  async componentDidMount() {
    const { id } = this.props;
    const result = getProductsFromCategory(id);
    this.setState({
      product: result,
    });
  }

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <div>
        <li data-testid="product">
          <h2>{ product.title}</h2>
          <img src={ thumbnail } alt={ title } />
          <h3>{ price }</h3>
        </li>
      </div>
    );
  }
}

Descricao.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Descricao;
