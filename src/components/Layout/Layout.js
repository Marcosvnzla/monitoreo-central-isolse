import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
  render () {
    return (
      <div className={styles.Layout}>
        <Sidebar/>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;