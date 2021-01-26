import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
  render () {
    return (
      <Fragment>
        <Toolbar />
        {this.props.children}
      </Fragment>
    );
  }
}

export default Layout;