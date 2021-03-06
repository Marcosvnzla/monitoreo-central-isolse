import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Central from './containers/Central/Central';
import CentralDataLoader from './containers/CentralDataLoader/CentralDataLoader';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onAuthCheckStatus();
  }

  render () {
    //non authorized routes
    let routes = (
      <Switch location={location} key={location.pathname}>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth"/>
      </Switch>
    );


    if (this.props.isAuthenticated) {
      routes = (
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Central} />
          <Route path="/dataLoader" component={CentralDataLoader} />
          <Route path="/logout" component={Logout} />
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
    isAuthenticated: state.token !== null,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckStatus: () => dispatch(actions.authCheckStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);