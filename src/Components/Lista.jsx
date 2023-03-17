import React, { Component } from 'react';

class Lista extends Component {
  state = {
    searchValue: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      searchValue: value,
    });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div>
        <label>
          <input type="search" value={ searchValue } onChange={ this.handleChange } />
        </label>
        <p data-testid="home-initial-message">
          {!searchValue
            ? 'Digite algum termo de pesquisa ou escolha uma categoria.' : ''}
        </p>
      </div>
    );
  }
}

export default Lista;
