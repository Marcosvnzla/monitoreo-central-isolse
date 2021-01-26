import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';
import Layout from './components/Layout/Layout';

class App extends Component {
  render () {
    return (
      <Layout>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Auth} />
          </Switch>
        </div>
      </Layout>
    );
  }
}

export default App;