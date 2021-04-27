import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import styles from './Layout.module.css';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Backdrop from '../UI/Backdrop/Backdrop';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showDrawer: false
  }

  showDrawer = () => {
    this.setState(prevState => {
      return {showDrawer: !prevState.showDrawer}
    });
  }

  render () {
    return (
      <Fragment>
        <Backdrop show={this.state.showDrawer} clicked={this.showDrawer} />
        <div className={styles.Layout}>
        <SideDrawer navClicked={this.showDrawer} bstate={this.state.showDrawer} />
        {this.props.isAuthenticated ? <Sidebar logoClicked={this.showDrawer} /> : null}
        {this.props.children}
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps)(Layout);