import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Lista from './Components/Lista';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Lista } />
      </Switch>
    </div>
  );
}

export default App;
