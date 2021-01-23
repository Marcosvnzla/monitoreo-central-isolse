import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Auth} />
        </Switch>
      </div>
    );
  }
}

export default App;