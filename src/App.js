import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Central from './containers/Central/Central';
import CentralDataLoader from './containers/CentralDataLoader/CentralDataLoader';
import Location from './containers/Location/Location';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onAuthCheckStatus();
    this.props.onCheckSessionStatus();
  }

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
          {/*<Route path="/dataLoader" component={CentralDataLoader} /> no incluida en el lanzamiento de Junio 2021*/}
          <Route path="/location" component={Location} />
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
    onAuthCheckStatus: () => dispatch(actions.authCheckStatus()),
    onCheckSessionStatus: () => dispatch(actions.checkSessionStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);