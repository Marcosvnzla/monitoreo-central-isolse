import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './Layout.module.css';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
  render () {
    return (
      <div className={styles.Layout}>
        {this.props.isAuthenticated ? <Sidebar/> : null}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps)(Layout);