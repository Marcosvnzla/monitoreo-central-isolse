import React, { Component, Fragment } from 'react';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
  render () {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default Layout;