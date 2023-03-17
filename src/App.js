import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Lista from './Components/Lista';
import Carrinho from './Components/Carrinho';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Lista } />
        <Route exact path="/Carrinho" component={ Carrinho } />
      </Switch>
    </div>
  );
}

export default App;
