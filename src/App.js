import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Central from './containers/Central/Central';
import CentralDataLoader from './containers/CentralDataLoader/CentralDataLoader';

class App extends Component {
  render () {
    //non authorized routes
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Central} />
          <Route path="/dataLoader" component={CentralDataLoader} />
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <Layout>
        <div className="App">
          {routes}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps)(App);